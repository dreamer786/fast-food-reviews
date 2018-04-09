// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 3000;
console.log("port ", process.env.PORT);
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

require('./models/db');


// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
	 // if we're in PRODUCTION mode, then read the configration from a file
	 // use blocking file io to do this...
	 const fs = require('fs');
	 const path = require('path');
	 const fn = path.join(__dirname, 'config.json');
	 const data = fs.readFileSync(fn);

	 // our configuration file will be in json, so parse it and set the
	 // conenction string appropriately!
	 const conf = JSON.parse(data);
	 dbconf = conf.dbconf;
} else {
	 // if we're not in PRODUCTION mode, then use
	 dbconf = 'mongodb://localhost/finalproject';
}
//var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(dbconf); 

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({extended: false}));

//app.use(bodyParser()); // get information from html forms

app.set('view engine', 'hbs'); 

// required for passport
app.use(session({secret: 'iloveicecreamyouloveicecream',
    			resave: false,
    			saveUninitialized: true, })); 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

const path = require('path');
app.set("views", path.join(__dirname, "views"));


app.use((req,res,next) =>{
	if(req.session.user){
		res.locals.user = req.session.user;
		//console.log("res locals", res.locals.user);
		//console.log("req session user ", req.session.user);
	}
	next();
});
// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
