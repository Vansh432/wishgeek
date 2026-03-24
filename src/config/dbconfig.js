import mongoose from "mongoose";

const connectDB=async()=>{
    try{
      const DBURL=process.env.DBURL
      const response=await mongoose.connect(DBURL)
      console.log("Database is connected")
    }catch(err){
        console.log(err);
        
    }
}

export default connectDB