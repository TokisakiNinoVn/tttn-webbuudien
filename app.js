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

app.use(session({
  secret: process.env.SESSION_SECRET || 'default-secret',
  resave: false, // Giữ nguyên false để chỉ lưu lại phiên khi có thay đổi
  saveUninitialized: false, // Chỉ lưu phiên khi có dữ liệu session được thiết lập
  cookie: {
    secure: false, // Đặt true nếu chạy trên HTTPS
    httpOnly: true, // Ngăn truy cập vào cookie qua JavaScript để bảo mật
    maxAge: 1000 * 60 * 60 // 1 giờ (thời gian tùy chỉnh theo nhu cầu)
  }
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

app.get('/api/check-session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

app.use(responseMiddleware.format);