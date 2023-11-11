const express = require('express');
const categoryController = require('../../controllers/post/categoryController');
const routerCategoryApi = express.Router();
routerCategoryApi.get('/', categoryController.index);
module.exports = routerCategoryApi;