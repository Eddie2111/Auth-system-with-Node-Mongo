const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const users = [];

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

/*** Recieveing post requests ***/
app.post('/register',(req,res)=>{
        try{
            const hashedPassword = bcrypt.hashSync(req.body.password,10);
            users.push({
                id: Date.now().toString(),
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
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
    res.render('index.ejs',{name:'Kyle'});
});
app.get('/login',(req,res)=>{
    res.render('login.ejs');
});
app.get('/register',(req,res)=>{
    res.render('register.ejs');
});
/***  Rendering of pages ***/

app.listen(3000);

