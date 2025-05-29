const express = require("express");
const route = express.Router();
const controller = require("../../controller/admin/categoryController");
//[GET] api/v1/admin/categories/
route.get('/', controller.index);



//[GET] api/v1/admin/categories/create
route.get('/create', controller.create);

//[POST] api/v1/admin/categories/createpost
route.post('/createpost', controller.createpost);
module.exports = route;


//[GET] api/v1/admin/categories/create
route.get('/edit/:id', controller.edit);

//[PATCH] api/v1/admin/categories/createpost
route.put('/edit', controller.editput);

//[DELETE] api/v1/admin/categories/delete/:id
route.patch('/delete/:id', controller.delete);

//[DELETE] api/v1/admin/categories/delete/:id
route.delete('/deletehard/:id', controller.deletehard);
module.exports = route;