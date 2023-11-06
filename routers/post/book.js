const express = require('express');
const routerBookApi = express.Router();
const bookController = require('../../controllers/post/bookController');

routerBookApi.get('/', bookController.index);
routerBookApi.get('/get-by-category/:id', bookController.findAllByCategory);
routerBookApi.get('/filter', bookController.handleFilter);
module.exports = routerBookApi;
