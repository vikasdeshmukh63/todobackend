const CustomErrorHandler = require("../helpers/customErrorHandler");
const Task = require("../models/taskModel");




const newTaskController = async (req, res,next) => {
  try {
    const { title, description } = req.body;

    const newTask = new Task({ title, description, user: req.user });
    await newTask.save();
    res.send({
      message: "Task added successfully",
      success: true,
      data: null,
    });
  } catch (error) {
    next(error)
  }
};


const myTaskController = async(req,res,next)=>{
    try {
        const user = req.user;

        const userTasks =await Task.find({user:user._id});
        res.send({
            message:`${user.name}'s tasks fetched successfully`,
            success:true,
            data:userTasks
        });
    } catch (error) {
        next(error)
    }
}


const updateTaskController = async(req,res,next)=>{
    try {
    const id = req.params.id;
    const task = await Task.findById(id);

    if(!task){
        return next(new CustomErrorHandler("Invalid Id"))
    }

    task.isCompleted = !task.isCompleted

    await task.save();
    res.send({
        message:"Task Updated successfully",
        success:true,
        data:null
    });

    } catch (error) {
        next(error)
    }
}


const deleteTaskController = async(req,res,next)=>{
    try {
        const id = req.params.id;
        const task = await Task.findById(id)

        if(!task){
            return next(new CustomErrorHandler("Invalid Id"));
        }

        task.deleteOne();

        res.send({
            message:"Task Deleted successfully",
            success:true,
            data:null
        });
    } catch (error) {
       next(error)
    }
}


module.exports = {
    newTaskController,
    myTaskController,
    updateTaskController,
    deleteTaskController
}