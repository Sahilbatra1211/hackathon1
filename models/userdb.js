
const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const userSchema=new Schema({
    eventname:{type:String,unique:true},
    password:String,
    organisationname:String,
    description:String,
    maxpeople:{type:Number, default:100},
    confirmed:{
        type:Boolean,
        default:false
    },
    secrettoken:String,
    email:{type:String,unique:true}
});



const user=mongoose.model("user",userSchema);


module.exports = {
    user
}