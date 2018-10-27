const route=require('express').Router();
const authCheck=(req,res,next)=>{
    if(!req.user)       //middleware to check if user is not logged in
    {
        //if user is not logged in
        res.redirect('/login')
    }
    else{
        next();
    }
}
route.use(function(req, res, next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});
route.use(authCheck);

route.get('/',(req,res)=>{

    res.render('loggedin',{user:req.user})

});


exports=module.exports=route;
