const db = require('../config/db.config'); // Kết nối MySQL

const Voucher = db.sequelize.define('Voucher', {
  id: {
    type: db.Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: { 
    type: db.Sequelize.STRING,
    allowNull: false,
    unique: true // Đảm bảo rằng voucher là duy nhất
  },
  discountAmount: {
    type: db.Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  discountType: {
    type: db.Sequelize.ENUM('percentage', 'fixed'),
    allowNull: false
  },
  startDate: {
    type: db.Sequelize.DATE,
    allowNull: false
  },
  endDate: {
    type: db.Sequelize.DATE,
    allowNull: false
  },
  usageLimit: {
    type: db.Sequelize.INTEGER,
    defaultValue: null // Giá trị mặc định là NULL
  },
  usedCount: {
    type: db.Sequelize.INTEGER,
    defaultValue: 0 // Giá trị mặc định là 0
  },
  isActive: {
    type: db.Sequelize.BOOLEAN,
    defaultValue: true // Giá trị mặc định là TRUE
  },
  createdAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: db.Sequelize.DATE,
    defaultValue: db.Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
  }
}, {
  timestamps: false // Tắt tự động quản lý createdAt và updatedAt
});

module.exports = Voucher;
