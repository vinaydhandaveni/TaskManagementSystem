const express=require('express')
const app=express()
require('dotenv').config()

const connectdb=require('./dbconfig/db')
const UserRoutes=require('./routes/userRoutes')
const TaskRoutes=require('./routes/TaskRoutes')
const bodyParser = require('body-parser');
app.use(bodyParser.json())


const PORT = process.env.PORT || 5000
// Connecting to the db object
connectdb();

app.listen(PORT,()=>{
    console.log('app running on port 5000');
});

app.use('/User',UserRoutes);
app.use('/Task',TaskRoutes)