const express = require('express');
const upload = require('../../middleware/multer');

const routerBook = express.Router();
const bookController = require('../../controllers/admin/bookController');

routerBook.get('/', bookController.index);
routerBook.post('/',upload.single('image'), bookController.create);
routerBook.put('/:id',upload.single('image'), bookController.update);
routerBook.delete('/:id', bookController.delete);
routerBook.get('/:id', bookController.findOne);
module.exports = routerBook;
