module.exports = function(app, passport) {
    const mongoose = require('mongoose');
    const User = mongoose.model("User");
    const Review = mongoose.model("Review");
    //home page
    app.get('/', function(req, res) {
        Review.find({}, (err,result,count) => {
            if (err){
                console.log(err);
            }
            else{
                res.render("index", {results: result});
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
                        successRedirect : '/profile', // redirect to the secure profile section
                        failureRedirect : '/login', // redirect back to the signup page if there is an error
                        failureFlash : true // allow flash messages
    }));

    // show the signup form
    app.get('/signup', function(req, res) {

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
        res.render('profile');
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    //ADD REVIEW
    app.get("/review/add", function(req,res){
        if (!req.session.user){
            console.log("not logged in");
            res.redirect("/");
        }
        else{
            res.render("addReview");
        }
    });

    //POST REVIEW
    app.post("/review/add", function(req,res){
        if (!req.session.user){
            console.log("not logged in");
            res.redirect("/");
        }
        else{
            const newReview = new Review();
            newReview.storeName = req.body.storeName;
            newReview.borough = req.body.borough;
            newReview.streetAddress = req.body.streetAddress;
            newReview.zip = req.body.zip;
            newReview.review = req.body.review;
            newReview.rating = req.body.rating;

            newReview.save(err => {
                if (err){
                    res.render("addReview", {message: "review save error"});
                }
                else{
                    res.redirect("/");
                }
            })
        }
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}