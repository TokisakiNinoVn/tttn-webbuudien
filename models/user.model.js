const db = require('../config/db.config'); // Kết nối MySQL

const User = db.sequelize.define('User', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: { // Thêm trường username
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true // Đảm bảo rằng username là duy nhất
  },
  name: {
    type: db.Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: db.Sequelize.STRING
  },
  address: {
    type: db.Sequelize.STRING
  },
  role: {
    type: db.Sequelize.ENUM('nhân viên', 'khách hàng'),
    defaultValue: 'khách hàng'
  },
  gender: { // Thêm trường gender
    type: db.Sequelize.ENUM('nam', 'nữ', 'khác'), // Thay đổi tùy theo nhu cầu
    allowNull: true // Có thể để trống
  },
  password: {
    type: db.Sequelize.STRING,
    allowNull: false
  }
});

module.exports = User;
