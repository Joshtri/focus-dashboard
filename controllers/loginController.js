// loginController.js
const bcrypt = require('bcrypt');
const db = require('../utils/dbConfig')



exports.loginUserAppAcc = (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (results.length === 0) {
      // User not found
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const hashedPasswordFromDatabase = results[0].password;

    bcrypt.compare(password, hashedPasswordFromDatabase, (err, passwordMatch) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (passwordMatch) {
        // Passwords match, user is authenticated

        // Store user information in the session
        req.session.userData = {
          id_user: results[0].id_user, // Assuming you have a user ID in your database
          username: results[0].username,
          // Add more user information as needed
        };


        // Redirect to the dashboard or any other route
        // res.status(200).json({ message: 'Login successful', redirect: '/dashboard' });
        res.redirect('/dashboard')
      } else {
        // Passwords do not match, authentication failed
        res.status(401).json({ message: 'Invalid username or password' });
      }
    });
  });
};


exports.loginView = (req, res) => {
  const titlePage = 'Login Page';
  res.render('login', {
    titlePage,
  });
};


exports.createAccountView = (req,res)=>{
  res.render('create_acc');
}


exports.logOutAccount = (req,res)=>{
  // Hapus data pengguna dari sesi
  
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/login');
    }
  });
}

// exports.createUserAppAcc = (req, res) => {
//   const { username,  password } = req.body;
//   bcrypt.hash(password, saltRounds, (err, hash) => {
//     if (err){
//       throw err;
//     } 
//     const sql = "INSERT INTO users (username,password) VALUES (?, ?)";
//     db.query(sql, [username, hash], (err, result) => {
//       if (err) 
//       {
//         throw err;
//       }
//       else{
//         res.send(result);
//       }
//     });
//   });
// };



exports.createUserAppAcc = (req, res) => {
  const { username, password } = req.body;
  const saltRounds = 10;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(sql, [username, hash], (err, result) => {
      if (err) {
        console.error('Error inserting user into database:', err);
        return res.status(500).json({ message: 'Internal server error' });
      }

      res.send(result);
    });
  });
};
