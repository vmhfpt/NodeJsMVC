const express = require('express');
const categoryController = require('../../controllers/admin/categoryController');
const routerCategory = express.Router();
routerCategory.get('/', categoryController.index);
routerCategory.post('/', categoryController.create);
routerCategory.put('/:id', categoryController.update);
routerCategory.delete('/:id', categoryController.delete);
routerCategory.get('/:id', categoryController.findOne);
module.exports = routerCategory;