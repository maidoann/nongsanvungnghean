const express = require("express");

const route = express.Router();
const controller = require("../../controller/admin/authController");
//[POST] api/v1/admin/auth/login
route.post('/login', controller.login);

//[POST] api/v1/admin/auth/register
route.post('/register', controller.register);

//[GET] api/v1/admin/auth/logout
route.get('/logout', controller.logout);



module.exports = route;