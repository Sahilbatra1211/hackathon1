const route=require('express').Router();
const model = require("../models/db");
const passport=require('../config/pass');
var bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const randomstring=require('randomstring');
//const mailer=require('../misc/mailer')


route.get('/',(req,res)=>{
    res.render('index');
});

route.get('/signup',(req,res)=>{
   res.render('signup');
});

route.get('/login',(req,res)=>{
    res.render('login');
});

route.post("/signup", (req,res)=>{
    console.log(req.body);
    bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
        // Store hash in your password DB.
        var hashpassword=hash;
        console.log(hash);
    });
    const secretToken= randomstring.generate();

// users.push({username: req.body.username, password: req.body.password})
    model.user.create({
        eventname: req.body.eventname,
        password: req.body.password,
        organisationname: req.body.organisationname,
        description:req.body.description,
        secrettoken:secretToken,
        email:req.body.email,
        maxpeople:req.body.maxpeople,
        confirmed:true
    }).then((createuser)=>{
        const html=`hi there ,<br/> Thank you for registering!<br/>
                    <br/>>please verify your email by adding the following token:<br/>
                    Token:<b>${secretToken}</b>
                      <br/>On the following page:<a href="http://localhost:3000/verify">http://localhost:3000/verify</a><br/>Have a pleasant day`

        //send email
        res.render('login');
       // mailer.sendEmail('mycoupon@company.com',createuser.email,'please verify your email',html)



    })

});


route.post('/login',passport.authenticate('local',{
    failureRedirect:'/login',
    successRedirect:'/private'
}));


exports=module.exports=route;
