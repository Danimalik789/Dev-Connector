const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const passport = require('passport')
const keys = require("../../config/keys");

//Load User Model
const User = require("../../models/User");

//@route   GET  api/users/test
//desc     Tests  users route
//access   Public
router.get("/test", (req, res) => res.json({ msg: "user works" }));

//@route   GET  api/users/register
//desc     Register a User
//access   Public
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exist" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", //Size
        r: "pg", // rating
        d: "mm", // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

//@route   POST  api/users/login
//desc     Login User // Returning a JWT Json Web Token
//access   Public

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // Find User By Email
  User.findOne({ email }).then((user) => {
    //Check for user
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    //Check for password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        //User Matched
        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //Create JWT payload

        //Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(404).json({ password: "Incorrect Password" });
      }
    });
  });
});

//@route   POST  api/users/current
//desc     Return Current User 
//access   Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res)=>{
  res.json({
    id: req.user.id,
    email: req.user.email,
    name: req.user.name,

  })
})
module.exports = router;
