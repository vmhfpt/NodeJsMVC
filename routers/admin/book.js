const express = require('express');
const routerBook = express.Router();
routerBook.get('/', (req, res) => {
    return res.status(200).send('this action to Get all books');
})
routerBook.post('/', (req, res) => {
    res.send('this action to create a book');
})
routerBook.patch('/:id', (req, res) => {
    res.send('this action to update a book by id');
})
routerBook.delete('/:id', (req, res) => {
    res.send('this action to delete a book by id');
})

module.exports = routerBook;
