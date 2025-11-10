import mongoose from 'mongoose'

const listSchema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    User:[{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }]
},{timestamps:true})

const Note = mongoose.model("Note",listSchema)

export default Note;