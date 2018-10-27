
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{type:String,unique:true},
    gender:String,
    adharno:Number,
    age:Number,
    confirmed:{
        type:Boolean,
        default:false
    },
    email:{type:String,unique:true},
    secrettoken:String
});



const customer=mongoose.model("customer",userSchema);


module.exports = {
    customer
};