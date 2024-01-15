const express = require('express');
const router = express.Router();

const {notesView} = require('../controllers/notesController');



router.get("/notes_view", notesView);




module.exports = router; 