const mysql = require('mysql2');
require('dotenv').config();

// Thiết lập kết nối MySQL bằng mysql2
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL!");
});

// Thiết lập Sequelize với MySQL
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Tạo đối tượng db chứa cả connection và sequelize
const db = {
  connection,    // Kết nối MySQL với mysql2
  Sequelize,     // Thư viện Sequelize
  sequelize      // Kết nối Sequelize
};

module.exports = db;
