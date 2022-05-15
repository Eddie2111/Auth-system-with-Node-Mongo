
const express = require('express');
const app = express();
const session = require('express-session');
require('./controller/formInject');
require('dotenv').config();
var cookieParser = require('cookie-parser');

var environment =
[app.set('view engine','ejs'),
app.use(express.urlencoded({extended: false})),
app.use(express.json()),
app.use( express.static( "public" ) ),


app.use(cookieParser()),
app.use(session({
    secret: process.env.SECRET_key,
    saveUninitialized: false,
    resave: false,
    maxAge: 3600000,
  }))]

  module.exports = environment;

