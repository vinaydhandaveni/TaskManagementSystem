const mongoose=require('mongoose');

require('dotenv').config();

const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.MONGOURL);
    }
    catch(err){
        console.error('Mongo connection error',err);
    }
}



const db=mongoose.connection;
db.on('connected',()=>{
    console.log('db connected');
})

db.on('disconnected',()=>{
    console.log('db disconnected');
})

module.exports=connectDB;

