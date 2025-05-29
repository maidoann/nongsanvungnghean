const express = require("express");
const route = express.Router();
const controller = require("../../controller/admin/dashboardController");

route.get('/', controller.index);

module.exports = route;