import Task from "../../models/task.model.js";
import User from "../../models/user.model.js";

export const getAllUsers=async(req,res)=>{
    try{
    const existAllUser=await User.find({role:'user'});
    return res.status(200).json({status:true,message:"Data fetched successfully",existAllUser})
    }catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

export const getAllTask=async(req,res)=>{
    try{
    const existAllTasks=await Task.find();
    return res.status(200).json({status:true,message:"Data fetched successfully",existAllTasks})
    }catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

export const deleteTask=async(req,res)=>{
       try{
        const {id}=req?.params;
        if(!id) return res.status(404).json({status:false,message:"Id is required"})
        await Task.findByIdAndDelete(id); 
    return res.status(200).json({status:true,message:"Data Deleted successfully"})
    }catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}


export const getTaskFilter = async (req, res) => {
  try {
    const {
      status,
      priority,
      search,
      page = 1,
      limit = 10,
      sortBy = "createdAt", 
      sortOrder = "desc",  
    } = req.query;

   

    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

 
    const skip = (Number(page) - 1) * Number(limit);


    const sortOptions = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };


    const tasks = await Task.find(filter)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Task.countDocuments(filter);

    return res.status(200).json({
      status: true,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
      data: tasks,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};