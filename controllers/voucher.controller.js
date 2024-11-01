const db = require('../config/db.config'); // Đường dẫn tới file cấu hình database

// Hàm thêm voucher
exports.addVoucher = async (req, res, next) => {
  try {
    const sql = `INSERT INTO Vouchers (code, endDate, usageLimit, usedCount) VALUES (?, ?, ?, ?)`;
    const { code, endDate, usageLimit } = req.body;
    const [result] = await db.pool.execute(sql, [code, endDate, usageLimit, 0]);
    
    const voucher = {
      id: result.insertId,
      code,
      endDate,
      usageLimit,
      usedCount: 0
    };
    
    return res.status(201).json(voucher);
  } catch (error) {
    next(error);
  }
};

// Hàm sửa voucher
exports.updateVoucher = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sql = `UPDATE Vouchers SET code = ?, endDate = ?, usageLimit = ? WHERE id = ?`;
    const { code, endDate, usageLimit } = req.body;
    const [result] = await db.pool.execute(sql, [code, endDate, usageLimit, id]);

    if (result.affectedRows > 0) {
      const updatedVoucher = await db.pool.execute(`SELECT * FROM Vouchers WHERE id = ?`, [id]);
      return res.status(200).json(updatedVoucher[0][0]);
    }
    return res.status(404).json({ message: 'Voucher not found' });
  } catch (error) {
    next(error);
  }
};

// Hàm xóa voucher
exports.deleteVoucher = async (req, res, next) => {
  const { id } = req.params;

  try {
    const sql = `DELETE FROM Vouchers WHERE id = ?`;
    const [result] = await db.pool.execute(sql, [id]);

    if (result.affectedRows > 0) {
      return res.status(204).send();
    }
    return res.status(404).json({ message: 'Voucher not found' });
  } catch (error) {
    next(error);
  }
};

// Hàm tìm kiếm voucher theo id hoặc code
exports.searchVoucher = async (req, res, next) => {
  const { query } = req.query;

  try {
    const sql = `SELECT * FROM Vouchers WHERE id = ? OR code = ?`;
    const [rows] = await db.pool.execute(sql, [query, query]);

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Hàm lọc voucher đã hết hạn
exports.filterExpiredVouchers = async (req, res, next) => {
  try {
    const today = new Date();
    const sql = `SELECT * FROM Vouchers WHERE endDate < ?`;
    const [rows] = await db.pool.execute(sql, [today]);

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Hàm lọc voucher chưa hết hạn
exports.filterActiveVouchers = async (req, res, next) => {
  try {
    const today = new Date();
    const sql = `SELECT * FROM Vouchers WHERE endDate >= ?`;
    const [rows] = await db.pool.execute(sql, [today]);

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Hàm lọc voucher còn lượt sử dụng
exports.filterUsableVouchers = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM Vouchers WHERE usageLimit > usedCount`;
    const [rows] = await db.pool.execute(sql);

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Hàm lọc voucher hết lượt sử dụng
exports.filterUsedOutVouchers = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM Vouchers WHERE usageLimit = usedCount`;
    const [rows] = await db.pool.execute(sql);

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Lấy tất cả voucher
exports.getAllVoucher = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM vouchers`;
    const [vouchers] = await db.pool.execute(sql);
    res.json(vouchers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
