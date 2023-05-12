const express = require('express');
const router = express.Router();
const handlers = require('./handlers');

router.post('/books', handlers.addBooksHandler);
router.get('/books', handlers.getAllBooksHandler);
router.get('/books/:id', handlers.getBooksByIdHandler);
router.put('/books/:id', handlers.editBookByHandler);
router.delete('/books/:id', handlers.deleteBookIdByHandler);
module.exports = router;