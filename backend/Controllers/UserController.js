const bcrypt=require('bcryptjs')
const user=require('./../models/user')
const jwt=require('jsonwebtoken')

exports.register= async (req,res)=>{
    const { name,email,password }= req.body;
    try{
        const existingUser= await user.findOne({email_id : email});
        if(existingUser) return res.status(400).json({error : 'User already exists'});

        const hashpassword= await bcrypt.hash(password,10);
        const user_obj= await user.create({user_name:name, email_id : email,password:hashpassword});
        return res.status(201).json({message :'user registration successful', userdetails : user_obj})
    }
    catch(err){
        console.log(err);
        return res.status(500).json({error : "Internal server error"});
    }
}

exports.Login= async (req,res)=>{
    const {email_id,password} =req.body;
    try{
        const item= await user.findOne({email_id : email_id});
        if(!item) return res.status(400).json({error : "Invalid credentials"});
        const isMatch= await bcrypt.compare(password,item.password);
        if(!isMatch) return res.status(400).json({error : "Invalid credentials"});
        const token=jwt.sign({UserId: item._id},process.env.JWT_SECRET_KEY)
        console.log('Generated Token:', token);
        res.status(200).json({message : "Login successful", token : token});
        }
    catch(err){
        return res.status(500).json({error : "Internal server error"})
    }
    }



exports.getusers=async (req,res)=>{
    try{
        const users=await user.find();
        return res.status(200).json(users);
    }
    catch(err){
        return res.status(500).json({error : "Internal server error"})
    }
};