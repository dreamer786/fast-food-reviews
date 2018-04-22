//passport configuration taken from the tutorial https://scotch.io/tutorials/easy-node-authentication-setup-and-local
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/db').User;
//const Review = require('../models/db').Review;

module.exports = function(passport) {
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    
    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose username is the same as the forms username
        // checking to see if the user trying to login already exists
        User.findOne({ 'local.username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err){
                return done(err);
            }

            // check to see if theres already a user with that username
            if (user) {
                req.session.user = user; 
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {

                // if there is no user with that username
                // create the user
                const newUser = new User();

                // set the user's local credentials
                newUser.local.email = req.body.email;
                newUser.local.username = username;
                newUser.local.password = newUser.generateHash(password);

                // save the user
                newUser.save(function(err) {
                    if (err){
                        throw err;
                    }
                    req.session.user = newUser; 

                    return done(null, newUser);
                });
            }

        });    

        });

    }));


    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { 
        User.findOne({ 'local.username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
                return done(err);
            }

            // if no user is found, return the message
            if (!user){
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

            // if the user is found but the password is wrong
            if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
            }

            // all is well, return successful user
            req.session.user = user; 
            return done(null, user);
        });

    }));
};
