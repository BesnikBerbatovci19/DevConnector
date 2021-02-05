const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const passport = require('passport');
const app = express();

// Body parser middelware
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// db config

const db = require('./config/keys').mongoURI;


//connect mongo db

mongoose.connect( db , {useUnifiedTopology: true, useNewUrlParser: true})
.then(() => console.log('Connected in db succses full'))
.catch(err => console.log(err))

// Passaport middleware
app.use(passport.initialize())

// Passaport Config

require('./config/passport')(passport);

// Use Routes

app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port} `))