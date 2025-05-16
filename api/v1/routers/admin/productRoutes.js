const express = require("express");
const multer = require('multer');
const fileUpload = multer({ storage: multer.memoryStorage() }); 
const uploadMidlewares = require('../../middlewares/admin/uploadMiddleware');

const route = express.Router();
const controller = require("../../controller/admin/productController");
//[GET] api/v1/admin/products/
route.get('/', controller.index);

//[GET] api/v1/admin/products/detail/:id
route.get('/detail/:id', controller.detail);

// [POST] /api/v1/admin/products/create
route.post('/create',
    fileUpload.array('images'),
    uploadMidlewares.upload ,
    controller.createpost);

// [GET] /api/v1/admin/products/create
route.get('/create',
    controller.create);

//[GET] /api/v1/admin/products/edit/:id
route.get('/edit/:id',
    controller.edit);

// [PUT] /api/v1/admin/products/edit
route.put('/edit',
    fileUpload.array('images'),
    uploadMidlewares.upload ,
    controller.editput);

module.exports = route;