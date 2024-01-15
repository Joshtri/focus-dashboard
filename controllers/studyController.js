const bcrypt = require('bcrypt');
const db = require('../utils/dbConfig');




//View Study Session.


exports.studyView = (req,res)=>{
    res.render('studies_data');
}