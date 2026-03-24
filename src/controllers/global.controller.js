import User from "../models/user.model.js";
import { accessTokenGenerate, referseTokenGenerates } from "../utils/tokenGenerates.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser=async(req,res)=>{
    try{
     const {email,name,password,role}=req?.body;
     
     const existUser=await User.findOne({email})
     
     if(existUser)return res.status(403).json({status:false,message:"user already exist"})
     
     const hashedPassword=await bcrypt.hash(password,10);
     const newUser=await User.create({
        email,
        name,
        password:hashedPassword,
        role
     })
     const referseToken=await referseTokenGenerates({id:newUser?._id,role});
     const accessToken=await accessTokenGenerate({id:newUser?._id,role});
     const hashedRefersToken=await bcrypt.hash(referseToken,12);
     await User.findOneAndUpdate({email},{referseToken:hashedRefersToken});

    return res.status(200).json({status:true,message:"user register successfully",accessToken,referseToken})
 
    }catch(err){
        return res.status(500).json({status:false,message:"Internal server error",error:err?.message})
    }
}


export const loginUser=async(req,res)=>{
    try{
      const {email,password}=req?.body;
   console.log(email);
      const existUser=await User.findOne({email})
    
      if(!existUser) return res.status(404).json({status:false,message:"User does not exist"});

      const hashedPass=existUser?.password;

      if(!bcrypt.compare(password,hashedPass))return res.status(403).json({status:false,message:"Password does not macted"});

      const accessToken=await accessTokenGenerate({id:existUser?._id,role:existUser?.role})

      const referseToken=await referseTokenGenerates({id:existUser?._id,role:existUser?.role})

      const hashedRefersToken=await bcrypt.hash(referseToken,12);

       await User.findOneAndUpdate({email},{referseToken:hashedRefersToken});

      return res.status(200).json({status:true,message:"Login successfully",accessToken,referseToken})
    }catch(err){
        return res.status(500).json({status:false,message:"Internal server error",error:err?.message})
    }
}
export const refreshToken = async (req, res, next) => {
  try {
    const {token} = req?.body;

    
    if (!token) {
      return res.status(401).json({ message: "No refresh token" });
    }
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    
    if (!user || !bcrypt.compare(token,user?.referseToken)) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const id=user?._id;
    const newAccessToken =await  accessTokenGenerate({id:user?._id,role:user?.role});
    const referseToken=await referseTokenGenerates({id:user?._id,role:user?.role})
     const hashedToken=await bcrypt.hash(referseToken,12);
    await User.findByIdAndUpdate(id,{referseToken:hashedToken});
    return res.status(200).json({status:true,message:"Token generated",referseToken,newAccessToken})
  } catch (error) {
    next(error);
  }
};
