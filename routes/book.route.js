const Book = require('../controllers/book.controller')
const express = require('express');
const router = express.Router();

router.get('/',Book.getAllBook );
router.get('/isbn/:isbn',Book.getByISBN );
router.get('/author/:author',Book.getByAuthor );
router.get('/title/:title',Book.getByTitle );
router.get('/review/:id',Book.getBookReview );
router.put('/modify/review/:id',Book.addBookReview)
module.exports = router;