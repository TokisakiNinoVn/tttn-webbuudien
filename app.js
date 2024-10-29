const { authorizeRole, authenticate, loginRequired } = require("./middlewares/middleware")
const authRoutes = require('./routes/public/index');
const privateRoutes = require('./routes/private/index');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const responseMiddleware = require('./middlewares/response-middleware');
require('dotenv').config();
const cors = require('cors');


const app = express();

// Cấu hình CORS để cho phép yêu cầu từ frontend
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware
app.use(bodyParser.json());
app.use(express.static("views")); // Cung cấp các file tĩnh từ thư mục views

// Cấu hình session
app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret', // Thay thế bằng chuỗi tĩnh nếu không có SESSION_SECRET
  resave: false,
  saveUninitialized: true,
}));

// Logging middleware
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

// Routes
app.get('/', function(request, response) {
  console.log('Received request at /'); // Logging
  response.set('Cache-Control', 'no-store');
  response.status(200).json({
    status: "Success",
    message: "The API Server is running!"
  });
});

app.get('/test', function(request, response) {
  response.status(200).json({
    message: "This is a test route."
  });
});
app.get('/api/public/test', function(request, response) {
  response.status(200).json({
    message: "Hehe, On \" /api/public/test\""
  });
});
app.get('/api/private/test', function(request, response) {
  response.status(200).json({
    message: "Hehe, On \" /api/private/test\""
  });
});

// Định nghĩa các route khác
app.use('/api/public', authRoutes);
app.use('/api/private', loginRequired, privateRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.use(responseMiddleware.format);