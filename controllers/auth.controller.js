const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { HTTP_STATUS } = require('../constants/status-code.js');

exports.login = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Tìm người dùng dựa trên username và email
    const user = await User.findOne({
      where: {
        username: username,
        email: email
      }
    });

    if (!user) {
      return next(res.status(404).json({ message: "User not found" }));
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(res.status(401).json({ message: "Invalid password" }));
    }

    // Kiểm tra vai trò người dùng
    if (user.role === 'khách hàng') {
      return next(res.status(403).json({ message: "Bạn không có quyền truy cập!" }));
    }

    // Nếu người dùng là 'nhân viên', lưu thông tin người dùng vào phiên
    req.session.user = { id: user.id, name: user.name, role: user.role };

    const userData = {
      id: user.id,
      username: user.username,  // Thêm thuộc tính username
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      gender: user.gender,
      address: user.address,
      updatedAt: user.updatedAt
    };

    res.status(200).json({
      status: 'success',
      data: userData,
      message: "Đăng nhập thành công",
    });
  } catch (error) {
    return next(res.status(500).json({ error: error.message }));
  }
};

