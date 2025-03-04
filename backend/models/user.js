const mongoose=require('mongoose')

user_schema=new mongoose.Schema({
    user_name : {
        type : String,
        required : true
    },
    email_id :{
        type : String,
        required : true,
        unique : true
    },

    password : {
        type : String,
        required : true
    }
})

module.exports=mongoose.model('User',user_schema,'User');