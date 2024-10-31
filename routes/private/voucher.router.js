// user.router.js
const express = require('express');
const router = express.Router();
const { voucherController } = require('../../controllers/index');

// Route để thêm voucher
router.post('/', voucherController.addVoucher);

// Route để sửa voucher theo ID
router.put('/:id', voucherController.updateVoucher);

// Route để xóa voucher theo ID
router.delete('/:id', voucherController.deleteVoucher);

// Route để tìm kiếm voucher theo ID hoặc code
router.get('/search', voucherController.searchVoucher);

// Route để tất cả các voucher
router.get('/', voucherController.getAllVoucher);

// Route để lọc voucher đã hết hạn
router.get('/expired', voucherController.filterExpiredVouchers);

// Route để lọc voucher chưa hết hạn
router.get('/active', voucherController.filterActiveVouchers);

// Route để lọc voucher còn lượt sử dụng
router.get('/usable', voucherController.filterUsableVouchers);

// Route để lọc voucher hết lượt sử dụng
router.get('/used-out', voucherController.filterUsedOutVouchers);

module.exports = router;
