// complaint.controller.js
const db = require('../config/db.config');

// Lấy tất cả đơn hàng kèm thông tin người dùng
exports.getAll = async (req, res, next) => {
    try {
      const sql = `
        SELECT o.*, u.username, u.name 
        FROM orders o
        JOIN users u ON o.user_id = u.id
      `;
      const [orders] = await db.pool.execute(sql);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Thêm một đơn hàng mới
exports.add = async (req, res, next) => {
  const { userId, totalAmount, shippingAddress, paymentMethod, toPerson, phone, status = 'pending' } = req.body;
  console.log(req.body);
  
  try {
    const sql = `INSERT INTO orders (
    user_id,
    total_amount,
    shipping_address,
    payment_method,
    toperson,
    phone,
    status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.pool.execute(sql, [userId, totalAmount, shippingAddress, paymentMethod, toPerson, phone, status]);
    
    res.status(201).json({
      message: "Order added successfully",
      orderId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
