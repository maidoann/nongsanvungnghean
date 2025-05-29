const express = require("express");
const multer = require('multer');
const fileUpload = multer({
    storage: multer.memoryStorage()
});
const uploadMidlewares = require('../../middlewares/admin/uploadMiddleware');

const route = express.Router();
const controller = require("../../controller/admin/userController");
//[GET] api/v1/admin/users/
route.get('/', controller.index);


//[POST] api/v1/admin/users/create
route.post('/create',
    fileUpload.array('images'),
    uploadMidlewares.upload,
    controller.create);

//[PATCH] api/v1/admin/users/EDIT
route.patch('/edit',
    fileUpload.array('images'),
    uploadMidlewares.upload,
    controller.edit);

//[PATCH] api/v1/admin/users/delete/:id
route.patch('/delete/:id', controller.delete);

//[DELETE] api/v1/admin/users/
route.delete('/delete/:id', controller.deletehard);


module.exports = route;