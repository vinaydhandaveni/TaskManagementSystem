const Task=require('./../models/task')

exports.createTask=async (req,res)=>{
        const {Taskname,description}=req.body;
        if(!Taskname){
            return res.status(400).json({error : "Invalid credentials"})
        }
        try{
            const new_task= new Task({
                    Taskname,
                    description,
                    completed:false,
                    UserId : req.user.UserId
                            
            })

            await new_task.save();
            res.status(201).json({message : 'Task created Successfully',Task : new_task});
        }
        catch(err){
            res.status(500).json({error : " Failed to create a task"})
        }
}


exports.deleteTask=async (req,res)=>{
    const {id}=req.params;
    console.log(id);
    console.log(req.user);
    try{
        const task=await Task.findOneAndDelete({_id:id,UserId:req.user.UserId})
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    }
    catch(err){
        res.status(500).json({error : "Failed to delete the task"})
    }
}

exports.updateTask= async (req,res)=>{
    const { id } = req.params;
    const { Taskname, description, completed } = req.body;
    try {
        const task = await Task.findOneAndUpdate(
            { _id: id, UserId: req.user.UserId },
            { Taskname, description, completed },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update task' });
    }
}

exports.getTasks=async (req,res)=>{
    try{
        const tasks=await Task.find({UserId : req.user.UserId});
        res.status(200).json({message:'Tasks Fetched successfully',Tasks : tasks});
    }
    catch(err){
        res.status(500).json({error : "Error in fetching Tasks"})
    }

}


