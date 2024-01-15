const mysql = require("mysql2");

// dbConfig.js

const db = mysql.createConnection({
  host: "localhost", // ganti dengan host MySQL Anda
  user: "root",
  password: "", // ganti dengan password MySQL Anda
  database: "db_focus_board", // ganti dengan nama database Anda
  waitForConnections: true,

});


db.connect(function(err,results){

  if(err){
      console.log(`error connecting ${err.message}`);
      
  }
  else if(!err){
      // console.log(results);
      console.log('connection database work :)');
  }
});


module.exports=db;
