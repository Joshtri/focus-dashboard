const express = require('express');
const router = express.Router();

const {taskView, postTask} = require('../controllers/tasksController');



router.get("/task_session", taskView);

router.post('/post_task', postTask)



module.exports = router; 