const express = require('express');
const router = express.Router();

const {studyView} = require('../controllers/studyController');



router.get("/study_session", studyView);




module.exports = router; 