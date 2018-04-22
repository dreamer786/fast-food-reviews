// route middleware to make sure a user is logged in
    function isLoggedIn (req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()) {
            return next();
        }
        // if they aren't redirect them to the home page
        res.redirect('/');
    } 
module.exports = function (app, passport) {
    const mongoose = require('mongoose');
    const User = mongoose.model('User');
    const Review = mongoose.model('Review');
    // const path = require('path');

    // home page
    app.get('/', function (req, res) {
        // higher order function 1
        const queryKeys = Object.keys(req.query);
        const filterObject = queryKeys.reduce(function (accum, curr) {
            if (req.query[curr]) {
                accum[curr] = req.query[curr];
            }
            return accum;
        }, {});
        Review.find(filterObject, (err, result) => {
            if (err) {
                console.log(err);
            } else {
               // console.log("result ", result);
                res.render('index', {results: result});
            }
        });
    });
   
    // show the login form
    app.get('/login', function(req, res) {
    // render the page and pass in any flash data if it exists
        res.render('login', { message: req.flash('loginMessage') }); 
    });
    
    // process the login form
     app.post('/login', passport.authenticate('local-login', {
                        successRedirect: '/profile', // redirect to the secure profile section
                        failureRedirect: '/login', // redirect back to the signup page if there is an error
                        failureFlash: true // allow flash messages
    }));

    // show the signup form
    app.get('/signup', function (req, res) {
    // render the page and pass in any flash data if it exists
        res.render('signup', { message: req.flash('signupMessage') });
    });

    // process the signup form
     app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: 'true'
     }));

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    app.get('/profile', isLoggedIn, function(req, res) {
        if (!req.user){
            console.log('not logged in');
            res.redirect("/");
        }
        else{
            // show all the user's reviews
            Review.find({user: req.session.user._id}, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.render('profile', {message: 'Database query error'});
                    } else if (result.length === 0){
                        res.render('profile', {message: 'You have not posted any reviews'});
                    } else {
                        res.render('profile', {results: result});
                    }
            });
        }
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    // ADD REVIEW
    app.get('/review/add', function (req, res) {
        if (!req.user) {
            console.log('not logged in');
            res.redirect("/");
        } else {
            res.render('addReview');
        }
    });

    // POST REVIEW
    app.post('/review/add', function (req, res) {
        if (!req.user) {
            console.log('not logged in');
            res.redirect('/');
        } else {
            const newReview = new Review();
            newReview.storeName = req.body.storeName;
            newReview.borough = req.body.borough;
            newReview.streetAddress = req.body.streetAddress;
            newReview.zip = req.body.zip;
            newReview.review = req.body.review;
            newReview.rating = req.body.rating;
            newReview.user = req.session.user._id;
            newReview.save(err => {
                if (err) {
                    res.render('addReview', {message: 'review save error'});
                } else {
                    res.redirect('/');
                }
            });
        }
    });
    // EDIT REVIEW FORM WITH OLD REVIEW PREFILLED
    app.get("/edit/:id", function (req, res) {
        if (!req.user) {
            console.log('not logged in');
            res.redirect('/');
        } else{
            Review.findOne({_id: req.params.id}, (err, result) => {
                if (err){
                    res.render("edit", {message: err});
                } else{
                    // console.log("review to edit ", result);
                    res.render("edit", {editReview: result});
                }
            });
        } 
    });
    // UPDATE REVIEW
    app.post("/edit/:id", function (req, res) {
        Review.findOneAndUpdate({_id: req.params.id}, { 
                storeName: req.body.storeName,
                borough: req.body.borough,
                streetAddress: req.body.streetAddress,
                zip: req.body.zip,
                rating: req.body.rating,
                review: req.body.review},
                (err) => {
                    if (err) {
                        res.render("edit", {mesage: err});
                    } else {
                        res.redirect("/profile");
                    }
                }

            );
        });
    //get the reviews of one store and the average rating
    app.get("/:storeAddress", function (req, res){
        Review.find({streetAddress: req.params.storeAddress}, (err, results) => {
            if (err){
                res.render("store", {message: err});
            }
            else if (results.length === 0){
                res.render("store", {message: "we do not have any reviews on this store"});
            }
            else{
            	let storeName;
                //higher order function 2
                //console.log("results ", results);
                const store = results.filter((document) => {
                    //console.log("document address ", document.streetAddress);
                    //console.log("url address ", req.params.storeAddress);
                    if (document.streetAddress === req.params.storeAddress){
                    	storeName = document.storeName;
                        return document;
                    }
                });
                //console.log("all store reviews ", store);
                //higher order function 3
                const avgRating = store.reduce((accum, ele) => {
                    accum += ele.rating;
                    return accum;
                }, 0) / store.length;

                res.render("store", {avgRating: avgRating, reviews: store, address: req.params.storeAddress, name: storeName});

            }

        });
    });
    //show reviews of the user
    app.get("/users/:username", function (req, res) {
        //console.log("username ", req.params.username);
        User.find({'local.username': req.params.username}, (err, result) => {
            if (err){
                //console.log(err);
                res.render('user', {message:err})
            }
            else if (result.length === 0 ){
                res.render('user', {message: "this user does not exist"});

            }
            else{
                Review.find({user: result[0]._id}, (err, results) => {
                    if (err) {
                        console.log(err);
                        res.render('user', {message: 'Database query error'});
                    } else if (result.length === 0){
                        res.render('user', {message: 'User has not posted any reviews'});
                    } else {
                        res.render('user', {results: results, count: results.length, username: req.params.username});
                    }
                });
            }
        });
        
    });

};
    