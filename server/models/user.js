import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{type:String },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    Note :[{
        type:mongoose.Types.ObjectId,
        ref:"Note"
    }]
},{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User
