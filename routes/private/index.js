const express = require('express');
var app = express();

// Import child routers
const customerRouter = require("./user.routes");
const voucherRouter = require("./voucher.router");
const complaintRouter = require("./complaint.router");
const responseRouter = require("./response.router");
const notificationRouter = require("./notification.router");
const orderRouter = require("./order.router");

// Use child router
app.use("/customers", customerRouter);
app.use("/vouchers", voucherRouter);
app.use("/complaints", complaintRouter);
app.use("/response", responseRouter);
app.use("/notifications", notificationRouter);
app.use("/orders", orderRouter);

module.exports = app;