export const routeNotFound=async(req,res,next)=>{
    try{
     return res.status(404).json({status:false,messsage:"Route not found"})
    }catch(err){
        return res.status(500).json({status:false,message:"Internal Server Error",error:err?.message})
    }
}