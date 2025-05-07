const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const passport = require('passport');


// Check if user is Admin
const isAdmin = (req, res, next) => {
    if(!req.user.isAdmin) {
        return res.status(403).json({error: "Access denied. Admin privileges required"});
    }
    next();
};

// @route   GET api/admin/users
// @desc    Get all users (admin only)
// @access  Private
router.get(
    "/users",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    async (req, res) => {
        try {
            const users = await User.find().select("-password");
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

// @route   PUT api/admin/users/:id/status
// @desc    Toggle user account status (admin only)
// @access  Private
router.put(
    "/users/:id/status",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            
            user.isActive = !user.isActive;
            await user.save();
            
            res.json({ 
                message: `User account ${user.isActive ? 'enabled' : 'disabled'} successfully`,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    isActive: user.isActive
                }
            });
        } catch (err) {
            res.status(500).json({ error: "Server error" });
        }
    }
);

module.exports = router;