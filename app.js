// app.js
const express = require('express');
const session = require('express-session');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const os = require('os');

const app = express();
const PORT = 3002;


// Set up session middleware
app.use(session({
  secret: 'your-secret-key', // Change this to a random and secure string
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 300000 // 5 menit dalam milidetik
  },
}));

const routerLogin = require('./routes/login');
const routerDashboard = require('./routes/dashboard');
const routerNotes = require('./routes/notes');
const routerStudies = require('./routes/studies');
const routerTask = require('./routes/task');

app.use(morgan('tiny'));

app.use(cors());
app.use(express.json());

// Menambahkan middleware body-parser pada aplikasi
app.use(bodyParser.json());
// parse request to body-parser
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + "/public"));

// Use the loginRouter for the login route
app.set('view engine', 'ejs');

// Set multiple view directories
app.set("views", [
  path.join(__dirname, "/views"),
  path.join(__dirname, "/views/notes"),
  path.join(__dirname, "/views/studies"),
  path.join(__dirname, "/views/tasks"),
  // Add other view directories if needed
]);

app.use('/', routerLogin); // '/auth' is just an example, adjust it to your desired path
app.use('/', routerDashboard); // '/auth' is just an example, adjust it to your desired path
app.use('/', routerNotes); // '/auth' is just an example, adjust it to your desired path
app.use('/', routerStudies); // '/auth' is just an example, adjust it to your desired path
app.use('/', routerTask); // '/auth' is just an example, adjust it to your desired path

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  // Mendapatkan informasi antarmuka jaringan
  const networkInterfaces = os.networkInterfaces();

  // Menampilkan alamat IP untuk setiap antarmuka jaringan
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    const interfaces = networkInterfaces[interfaceName];
    interfaces.forEach((iface) => {
      if (iface.family === 'IPv4' && !iface.internal) {
        console.log(`Server is running at http://${iface.address}:${PORT}`);
      }
    });
  });
});
