const express = require('express');
var app = express();

// Import child routers
const customerRouter = require("./user.routes");
const voucherRouter= require("./voucher.router");

// Use child router
app.use("/customers", customerRouter);
app.use("/vouchers", voucherRouter);

module.exports = app;