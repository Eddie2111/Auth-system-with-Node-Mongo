const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const bcrypt        = require('bcrypt');
const session       = require('express-session');
const users         = [];
const passport      = require('passport');
const url           = 'mongodb://localhost:27017/prac';
const flash         = require('express-flash');
const axios         = require('axios');
const fetch         = require("fs");
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


/** custom api testing **/
var options = {
    method: 'GET',
    url: 'https://community-open-weather-map.p.rapidapi.com/climate/month',
    params: {q: 'Dhaka'},
    headers: {
      'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com',
      'x-rapidapi-key': 'de4521d967msh4f0f50f65ecdfb0p1282b4jsne253f8022f73'
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data);
  }).catch(function (error) {
      console.error(error);
  });
/** custom api testing **/

/*** Session storing systems ***/

//app.use(session({
//    secret: process.env.SESSION_SECRET,
//    resave: false,
//    saveUninitialized: false
//  }))

/*** practicing with mapping variables */
let constant = 2;
/*** practicing with mapping variables */


/*** Connecting to MongoDB ***/
mongoose.connect("mongodb://localhost/auth_demo");
console.log('Success on connecting mongo');
/*** Connecting to MongoDB ***/



/*** Recieveing post requests ***/
app.post('/register',(req,res)=>{
        try{
            const hashedPassword = bcrypt.hash(req.body.password,10);
            users.push({
                id: Date.now().toString(),
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword,
            });
            res.redirect('/login');
        } catch{
            res.redirect('/register');
        }
        console.log(users); //send this to database
        
    });
    
app.post('/login',(req,res)=>{
    res.send('You are logged in');
});
/*** Recieveing post requests ***/


/***  Rendering of pages ***/
app.get('/',(req,res)=>{
    res.render('index.ejs',{title:'Welcome!',name:'Edward', sum:{constant}});
});
app.get('/dashboard',(req,res)=>{
    res.render('dashboard.ejs',{title:'Dashboard',name:'Edward'});
});
    
app.get('/login',(req,res)=>{
    res.render('login.ejs',{title:'Login'});
});
app.get('/register',(req,res)=>{
    res.render('register.ejs',{title:'Register'});
});
/***  Rendering of pages ***/


const port = 3000;
/*** App listening ***/
app.listen(port,()=>{
    console.log("Server at→ "+port);
});
/*** App listening ***/
