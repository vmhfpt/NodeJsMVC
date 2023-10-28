const express = require('express');
const userController = require('../../controllers/admin/userController.js');
const routerUser = express.Router();
routerUser.get('/', userController.index);
routerUser.get('/:id', userController.getOne);
routerUser.post('/', userController.create);
routerUser.put('/:id', userController.update);
routerUser.delete('/:id', userController.delete);


module.exports = routerUser;
