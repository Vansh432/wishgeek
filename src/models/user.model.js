import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,'email is unique'],
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    role:{
        type:String,
        enum:['user','admin'],
        required:[true,"role is required"],
    },
    referseToken:{
        type:String
    }

})

//indexing---> it is not scanned all docs and add no duplication in DB level
userSchema.index({email:1},{unique:true})

const User=mongoose.model('user',userSchema);
export default User;