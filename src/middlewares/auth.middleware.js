import jwt from 'jsonwebtoken'
export const authMiddleware=async(req,res,next)=>{
    try{
     const authHeader=req?.headers?.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token" });
    }
    const token=authHeader.split(" ")[1];
     const decode=jwt.verify(token,process.env.JWT_SECRET);
      req.user=decode;
      next();
    }catch(err){
        return res.status(401).json({status:false,message:"Invalid token"})
    }
}

export const isAdmin=async(req,res,next)=>{
    try{ 
     const user=req?.user;

     if(user?.role!=='admin')return res.status(401).json({status:false,message:"Unauthorized User"});
     next();  

    }catch(err){
         return res.status(500).json({status:false,message:"Internal server error",error:err?.message})
    }
}

export const isNormalUser=async(req,res,next)=>{
    try{ 
     const user=req?.user;
   
     if(user?.role!=='user')return res.status(401).json({status:false,message:"Unauthorized User"});
     next();  
    }catch(err){
         return res.status(500).json({status:false,message:"Internal server error",error:err?.message})
    }
}