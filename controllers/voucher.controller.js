const db = require('../config/db.config');

// Hàm thêm voucher
exports.addVoucher = async (req, res, next) => {
  try {
    const sql = `
      INSERT INTO Vouchers (code, discount_type, discount_amount, start_date, end_date, usage_limit, used_count, description) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const { code, discountType, discountAmount, startDate, endDate, usageLimit, description } = req.body;

    const [result] = await db.pool.execute(sql, [code, discountType, discountAmount, startDate, endDate, usageLimit, 0, description || null]);
    
    const voucher = {
      id: result.insertId,
      code,
      discountType,
      discountAmount,
      startDate,
      endDate,
      usageLimit,
      usedCount: 0,
      description: description || null // Ensure description is returned as null if not provided
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
    const sql = `
      UPDATE Vouchers 
      SET code = ?, start_date = ?, end_date = ?, discount_type = ?, discount_amount = ?, usage_limit = ?, description = ?
      WHERE id = ?`;

    const { code, startDate, endDate, discountType, discountAmount, usageLimit, description } = req.body;

    // Set description to null if it's not provided
    const [result] = await db.pool.execute(sql, [
      code,
      startDate,
      endDate,
      discountType,
      discountAmount,
      usageLimit,
      description || null,
      id,
    ]);

    if (result.affectedRows > 0) {
      const [updatedVoucher] = await db.pool.execute(`SELECT * FROM Vouchers WHERE id = ?`, [id]);
      return res.status(200).json(updatedVoucher[0]);
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
    const sql = `SELECT * FROM Vouchers WHERE end_date < ?`;
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
    const sql = `SELECT * FROM Vouchers WHERE end_date >= ?`;
    const [rows] = await db.pool.execute(sql, [today]);

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Hàm lọc voucher còn lượt sử dụng
exports.filterUsableVouchers = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM Vouchers WHERE usage_limit > used_count`;
    const [rows] = await db.pool.execute(sql);

    return res.status(200).json(rows);
  } catch (error) {
    next(error);
  }
};

// Hàm lọc voucher hết lượt sử dụng
exports.filterUsedOutVouchers = async (req, res, next) => {
  try {
    const sql = `SELECT * FROM Vouchers WHERE usage_limit = used_count`;
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
