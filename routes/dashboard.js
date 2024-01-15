// loginRouter.js
const express = require('express');
const { dashboardView} = require('../controllers/dashboardController');
const {isLoggedIn} = require('../auth/protect');

const router = express.Router();

// Define your login route
router.get('/dashboard', dashboardView, isLoggedIn);




module.exports = router;    
