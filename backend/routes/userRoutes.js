const express=require('express')
const router=express.Router()
const {register,getusers,Login}=require('./../Controllers/UserController')


router.post('/create',register);
router.get('/getusers',getusers);
router.post('/login',Login)


module.exports=router