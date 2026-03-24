import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
   
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:['todo','inprogress','completed'],
        default:'todo'
    },
    priority:{
        type:String,
        enum:['low','medium','high'],
        default:'low'
    },
    dueDate:Date,
    createBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:[true,"createdBy is required"]
    }
    
})

const Task=mongoose.model('task',taskSchema)

export default Task;