import Task from "../../models/task.model.js";


export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      createBy: req.user.id,
    });

    return res.status(201).json({
      status: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};


export const getAllTask=async(req,res)=>{
    try{
    const userId=req?.user?.id;
   
    const tasks = await Task.find({ createBy: req.user.id })
      .sort({ createdAt: -1 });
    return res.status(200).json({status:true,message:"Data fetched successfully",tasks});
    }catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}


export const getTaskById=async(req,res)=>{
    try{
    const {id}=req?.params;
 
    if(!id) return res.status(404).json({status:false,message:"Id is required"})
    const userId=req?.user?.id;
    const tasks = await Task.findOne({_id:id,createBy:userId});
    if(!tasks)return res.status(404).json({status:false,message:"Task does not exist"});
    return res.status(200).json({status:true,message:"Data fetched successfully",tasks});
    }catch (error) {
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
}

export const updateTask=async(req,res)=>{
    try{
    const {id}=req?.params;
    const userId=req?.user?.id
    const {title,description,status,priority,dueDate}=req?.body;
    if(!id) return res.status(404).json({status:false,message:"Id is required"})
    const tasks=await Task.findOne({_id:id,createBy:userId});
     if(!tasks) return res.status(404).json({status:false,message:"Task does not exist"});
     const newTitle= title || tasks?.title;
     const newDescription=description || tasks?.description;
     const newStatus=status ||  tasks?.status;
     const newPriority=priority ||  tasks?.priority;
     const newDueDate=dueDate || tasks?.dueDate
     const taskUpdated=await Task.findByIdAndUpdate(id,{
        title:newTitle,
        description:newDescription,
        status:newStatus,
        priority:newPriority,
        dueDate:newDueDate
     },{new:true})
      return res.status(200).json({status:true,message:"Data updated successfully",taskUpdated})
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
    const userId=req?.user?.id
    const tasks=await Task.findOne({_id:id,createBy:userId});
     if(!tasks) return res.status(404).json({status:false,message:"Task does not exist"});
         await Task.findByIdAndDelete(id);
        return res.status(200).json({status:true,message:"Data deleted successfully"});
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


    // filter by user Id
    const filter = {
      createBy: req.user.id, 
    };
   

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