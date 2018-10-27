const route=require('express').Router();
const model = require("../models/userdb");
const {customer}=require("../models/customer");
const randomstring=require('randomstring');



route.get('/:id',(req,res)=>{

    model.user.findOne({
        eventname:req.params.id,
    }) .then((users)=>{
        res.render('registration',{users:users})
    })

});

route.post('/registration',(req,res)=>{
    const secretToken= randomstring.generate();
    customer.create({
        username: req.body.username,
        gender: req.body.gender,
        adharno: req.body.adharno,
        age:req.body.age,
        email:req.body.email,
        confirmed:false,
        secrettoken:secretToken

    }).then((createuser)=>{
        const html=`hi there ,<br/> Thank you for registering!<br/>
                    <br/>>please verify your email by adding the following token:<br/>
                    Token:<b>qr code</b>
                      <br/>On the following page:<a href="http://localhost:3000/verify">http://localhost:3000/verify</a><br/>Have a pleasant day`

        //send email
        res.send('verification email has been sent to your email adress')
        // mailer.sendEmail('mycoupon@company.com',createuser.email,'please verify your email',html)



    }).catch((err)=>{
        console.log(err);
    })
});

exports=module.exports=route;