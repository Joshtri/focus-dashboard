// loginRouter.js
const express = require('express');
const { loginUserAppAcc ,loginView, createAccountView, createUserAppAcc, logOutAccount} = require('../controllers/loginController');

const router = express.Router();

// Define your login route
router.get('/login', loginView);


router.get('/create_account',createAccountView)
router.get('/logout', logOutAccount);

router.post('/post_create_account', createUserAppAcc)
router.post('/post_login', loginUserAppAcc)

module.exports = router;    
