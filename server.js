require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3009 ;
const path = require('path');
const cors = require('cors');
const multer = require('multer');

// Cors 
const corsOptions = {
  origin: process.env.ALLOWED_CLIENTS.split(',')
  ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

app.use(cors())

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/') ,
  filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
            cb(null, uniqueName)
  } ,
});

let upload = multer({ storage, limits:{ fileSize: 1000000 * 100 }, }).single('myfile'); //100mb

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

// app.use(cors(corsOptions))
app.use(express.static('public'));

const connectDB = require('./config/db');
connectDB();

app.use(express.json());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); 

// Routes 
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));
app.use('/',require("./routes/aman"));




app.listen(PORT, console.log(`Listening on port ${PORT}.`));