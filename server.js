import app from "./src/app.js";
import { configDotenv } from "dotenv";
import connectDB from "./src/config/dbconfig.js";
configDotenv();
connectDB();

const port=process.env.PORT

app.listen(port,(err)=>{
    if(err){
        console.log("Server is not runing on port: ",port)
        return;
    }
    console.log("server is runing on port: ",port);
})


