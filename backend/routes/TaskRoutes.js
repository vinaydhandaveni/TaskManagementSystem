const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('./../Controllers/TaskController');
const auth = require('./../Middlewares/authMiddleware');
const rate=require('./../Middlewares/rateLimiter') ;

const router = express.Router();

router.post('/createTask', auth,rate, createTask);
router.get('/getTasks', auth, rate, getTasks);
router.put('/updateTask/:id', auth, updateTask);
router.delete('/deleteTask/:id', auth, deleteTask);

module.exports = router;