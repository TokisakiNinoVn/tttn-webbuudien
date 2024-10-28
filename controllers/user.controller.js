const db = require('../config/db.config');
const bcrypt = require('bcrypt');

// Đăng ký người dùng mới
exports.register = async (req, res, next) => {
  const { name, email, phone, address, role, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO User (name, email, phone, address, role, password)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.execute(sql, [name, email, phone, address, role || 'khách hàng', hashedPassword]);

    res.status(201).json({ message: "User registered successfully", userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Đăng nhập
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const sql = `SELECT * FROM User WHERE email = ?`;
    const [rows] = await db.execute(sql, [email]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    req.session.user = { id: user.id, name: user.name, role: user.role };
    res.json({ message: "Login successful", user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả người dùng
exports.getAllUsers = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM User`;
    const [users] = await db.execute(sql);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sql = `SELECT * FROM User WHERE id = ?`;
    const [rows] = await db.execute(sql, [id]);
    const user = rows[0];

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, phone, address } = req.body;

  try {
    const sql = `UPDATE User SET name = ?, phone = ?, address = ? WHERE id = ?`;
    await db.execute(sql, [name, phone, address, id]);

    res.json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Xóa người dùng
exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sql = `DELETE FROM User WHERE id = ?`;
    await db.execute(sql, [id]);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
