const { post } = require('../routes/task');
const db = require('../utils/dbConfig');




//view get task.
exports.taskView = (req,res)=>{
    const titlePage =  "Task View";

    const readQuery = "SELECT * FROM task_table";

    db.query(readQuery,(err,results)=>{

        if(err){
            console.log(err);
        }

        else if(!err){
            res.render('task_data',{
                titlePage,
                taskData : results
            });
        }
    });
};




//post task data .


exports.postTask = (req,res)=>{
    const taskFields = {
        
        kegiatan : req.body.kegiatan,
        catatan : req.body.catatan,
        date_task : req.body.date_task,
        status_tugas : req.body.status_tugas
    }

    const postQuery = "INSERT INTO task_table SET ?";


    db.query(postQuery, taskFields, (err,results)=>{
        if(err){
            console.log(err);
        }

        else if(!err){
            // res.send('sukses upload data');
            res.redirect('task_session');
        }
    });
}