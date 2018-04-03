const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('./db');
const session = require('express-session');
const path = require('path');
const auth = require('./auth.js');

const app = express();
const Article = mongoose.model('Article');
const User = mongoose.model('User');

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'add session secret here!',
    resave: false,
    saveUninitialized: true,
}));

app.get("/", (req, res) => {});
app.get("/login", (req, res) => {});
app.post("/login", (req, res) => {});
app.get("/register", (req, res) => {});
app.post("/register", (req, res) => {});
app.get("/review/add", (req, res) => {});
app.post("/review/add", (req, res) => {});
app.get("/:myreview", (req, res) => {});






app.listen(3000);