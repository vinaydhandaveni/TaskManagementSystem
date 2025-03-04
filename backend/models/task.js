const mongoose=require('mongoose')

Task_schema=new mongoose.Schema({
    Taskname:{
        type : String,
        required : true,
        
    },

    description:{
        type : String
    },

    completed : {
        type : Boolean,
        required : true
    },

    UserId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:'User',
        required : true
    }
})


module.exports=mongoose.model('Task',Task_schema,'Task');