// complaint.controller.js
const db = require('../config/db.config');

// Lấy tất cả các khiếu nại và thông tin người dùng
exports.getAll = async (req, res, next) => {
    try {
        const sql = `
            SELECT 
                complaints.*, 
                users.username, 
                users.name 
            FROM 
                complaints 
            JOIN 
                users ON complaints.userId = users.id
        `;
        const [complaints] = await db.pool.execute(sql);
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
