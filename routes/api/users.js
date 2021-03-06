const exppres = require('express');
const router = exppres.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation

const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')
// Load User Model
const User = require('../../models/User')

// @route Get api/users/test
// @desc Tests post route
// @access Public

router.get('/test', (req, res) => res.json({msg: "Users works"}))

// @route Get api/users/register
// @desc Register User
// @access Public

router.post('/register', (req, res) =>{
    const {errors, isValid } = validateRegisterInput(req.body);

    // Check valid

    if(!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({ email: req.body.email })
    .then(user => {
        if(user){
            errors.email = "Email already"
            return res.status(400).json(errors.email)
        }else{
            const avatar = gravatar.url(req.body.email, {
                s: '200', //Size
                r: 'pg', //Rating
                d: 'mm' //Default
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar,
                password: req.body.password
            });

            bcrypt.genSalt(10 , (err, salt) =>{
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err =>console.log(err))
                })
            })
        }
    })


})

// @route Get api/users/login
// @desc Login User / returning  JWT Token
// @access Public

router.post('/login', (req, res) => {
    const {errors, isValid } = validateLoginInput(req.body);

    // Check valid

    if(!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    //find user by email


    User.findOne({email})
    .then(user =>{
        // check for user

        if(!user){
            return res.status(404).json('User not found');
        }

        // Check Password

        bcrypt.compare(password, user.password )
        .then(isMatch => {
            if(isMatch){
                //User Match
                const payload = { id: user.id, name: user.name , avatar: user.avatar } // Create JWT payloads

                //Sign Token
                jwt.sign(payload, keys.secretOrKey,
                { expiresIn: 3600},
                      (err, token) =>{
                          
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
            }else{
                return res.status(400).json({password: 'Password Incorrect'})
            }
        })
    });
})
// @route Get api/users/current
// @desc Return current user
// @access Private

router.get('/currrent', passport.authenticate('jwt', {session: false}), (req, res) =>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router;