// user.router.js
const express = require('express');
const router = express.Router();
const { orderController } = require('../../controllers/index');

// Route để tất cả các response
router.post('/', orderController.add);
router.get('/', orderController.getAll);


module.exports = router;
