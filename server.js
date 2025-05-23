const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const passport = require('passport')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const admin = require('./routes/api/admin')
const path = require('path')

const app = express();

//BodyParser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Db Config 
const db = require('./config/keys').mongoURI;

//Connect to MongoDb
mongoose.connect(db)
    .then(()=> console.log("MongoDb connected"))
    .catch(err => console.log(err))


// Passport Middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport')(passport)


//Use Routes
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts) 
app.use('/api/admin' , admin)

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
        // Set static folder
    app.use(express.static('client/build'))

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client' , 'build', 'index.html'))
    } )

}

const port = process.env.PORT || 5000;

app.listen(port, () =>console.log(`Server is running on port ${port}`))


