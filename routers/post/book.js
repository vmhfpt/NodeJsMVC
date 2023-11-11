const express = require('express');
const routerBookApi = express.Router();
const bookController = require('../../controllers/post/bookController');

routerBookApi.get('/', bookController.index);
routerBookApi.get('/get-by-category/:id', bookController.findAllByCategory);
routerBookApi.get('/filter', bookController.handleFilter);
routerBookApi.get('/:slug', bookController.findOneBySlug);
routerBookApi.post('/get-book-relate', bookController.getRelateBookByCategoryId);
module.exports = routerBookApi;
