import mongoose from "mongoose";

// connect with your database
mongoose.connect('mongodb://127.0.0.1:27017/userdata');


const userSchema = new mongoose.Schema({
    
    email:String,
    name:String,
    img:String,
})


export const userSchemaa = mongoose.model('userinfo',userSchema);