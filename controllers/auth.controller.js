const bcrypt = require('bcrypt');
const User = require('../models/user.model');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    req.session.user = { id: user.id, name: user.name, role: user.role };

    if (user.role === 'nhân viên') {
      res.json({ message: "Login successful", role: "nhân viên" });
    } else {
      res.json({ message: "Login successful", role: "khách hàng" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
