const db = require('../utils/dbConfig');




//view get notes.
exports.notesView = (req,res)=>{
    const titlePage =  "Notes View";

    res.render('notes_data',{
        titlePage
    });

};