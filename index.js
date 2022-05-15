const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./model/user');

const environment = require('./environment');
var cookieParser = require('cookie-parser');
app.set('view engine','ejs')
app.use(environment);


app.get('/',(req,res)=>{
      res.render('pages/index'); 
  });
 
app.get('/login',(req,res)=>{
    res.render('pages/login');
});
app.post('/login',(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    var MongoClient = Mongo.connect(url, function (err, db) {
        if(err) throw err;
        var dbo = db.db("eventizer");
        dbo.collection("event_vendors").findOne({email:email},function(err,result){
          if (err) throw err;
    
          if (result){ //on success -> email
            console.log(result.password);
            const syst = bcrypt.compare(password,result.password,(err,data)=>{
                if (data === true){
                    // in here
                    req.session.user = true;
                    res.render('pages/welcome');
                }
                else{
                    res.render('pages/index');
                }
            });
          }
    
          if (!result){
            const result = {};
            console.log("No data found");   
          }
        });
    
      });
    
});
 app.get('/logout',(req,res)=>{
    req.session.destroy();
    res.render('pages/login');
});

  app.get('/profile',(req,res)=>{
      if (req.session.user){
        res.render('pages/form');
    }
    else{
    res.render('pages/login');
    }
});


const port =  process.env.PORT;
app.listen(port,()=>{
    console.log("Server started at "+ port);   
})










var Mongo = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');
const url = `mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@${process.env.DBCLUSTER}`;
