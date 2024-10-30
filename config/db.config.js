const mysql = require('mysql2');
require('dotenv').config();

// Thiết lập kết nối MySQL bằng mysql2 với Pool và Promise
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
}).promise();

// Thiết lập Sequelize với MySQL
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});

// Tạo đối tượng db chứa cả pool và sequelize
const db = {
  pool,         // Kết nối MySQL pool với mysql2
  Sequelize,    // Thư viện Sequelize
  sequelize     // Kết nối Sequelize
};

module.exports = db;
