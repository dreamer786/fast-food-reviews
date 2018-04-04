Fast Food Reviews

## Overview

This app will allow users to look for a location of a popular fast food chain in NYC. The person will be able to
see reviews on that location, which can help them decide what to order or if they would rather go to another location.
Users can register, log in, make a review, filter reviews, and view their own reviews. 

## Data Model

The application will store Users and Reviews. A User object will contain an array of reviews. A
review will contain a reference to the user id. 

An example User
```
{username:	"foodguru123"
 password:  //a salted and hashed password 
 reviews: //array of references to Review documents
}
```
An example Review

```
{storeName: "McDonalds"
 review: "Don't drink their coffee unless you want to feel sick"
 rating: 3 (out of 5)
 username: foodguru123
 streetAddress: "90-07 Sutphin Blvd"
 borough: "Queens"
 zip: "11435"
 state: "NY"
 }

```

## [Link to Commented First Draft Schema] 

![first draft schema](src/db.js)

## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)


/ - home page than has login, register, all the reviews, and allows user to filter reviews
![home](/documentation/home.png)
 
/login - allows users to login

![login](documentation/login.png)

/register - form for creating an account

![register](documentation/register.png)

/review/add - form for adding a review

![add review](documentation/addreview.png)

/review/slug - page for showing user reviews

![my review](documentation/myreview.png)
## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)
![site map](documentation/sitemap.png)


## User Stories or Use Cases

1. as non-registered user, I can search for reviews of restaurants and register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new review
4. as a user, I can view all of my reviews

## Research Topics


* (5 points) Automated functional testing for all of your routes:
	* I will use selenium or headless chrome to test my routes. Headless chrome can run without having the
	memory overhead of running an actual Chrome browser. I will use it because it eliminates the need 
	to open my browser and manually go to web pages to test them out. 
* (3 points) Unit testing with Javascript (Mocha) OR client-side Javascript library (JQuery)
	* I will use this to test whether my login and register functions work properly. 
	* The cases include logging in with incorrect username and/or password, logging in with correct username/password.
	* Other cases include registering with a valid password and invalid password. 
	
	* JQuery abstracts html from javascript and wraps Javascript codes into methods. I would use it to help
	* with form validation. For example, if the user forgets to enter a field, that field can be highlighted to
	* make it easy to see what information is missing. 

8 points total out of 8 required points 


## [Link to Initial Main Project File](app.js) 

![app](src/app.js)

## Annotations / References Used

 have not used any sources yet
1. 
2. 