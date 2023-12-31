const Books = require('../models/book.model')
const mongoose = require('mongoose')
// Get All books
const getAllBook = async(req,res,next)=>{
    try {
        const books = await Books.find();
        const formattedBooks = books.map(book => ({
            id: book._id,
            name: book.name,
            ISBN: book.isbn,
            Author: book.author,
            Title: book.title,
            Review: book.review
          }));
        res.json(formattedBooks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching books' });
    }
};
//Get By ISBN
const getByISBN = async (req, res, next) => {
    try {
      const { isbn } = req.params;
      const books = await new Promise((resolve, reject) => {
        Books.find({ isbn })
          .then(resolve)
          .catch(reject);
      });
  
      if (!books.length) {
        res.status(404).json({ message: 'No books found with the given ISBN' });
        return;
      }
  
      const formattedBooks = books.map(book => ({
        id: book._id,
        name: book.name,
        ISBN: book.isbn,
        Author: book.author,
        Title: book.title,
        Review: book.review
      }));
  
      res.json(formattedBooks);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error searching books' });
    }
  };
// Get By Author
const getByAuthor = async(req,res,next)=>{
    try {
        const { author } = req.params;
        const books = await Books.find({ author });
        const formattedBooks = books.map(book => ({
            id: book._id,
            name: book.name,
            ISBN: book.isbn,
            Author: book.author,
            Title: book.title,
            Review: book.review
          }));
        res.json(formattedBooks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching books' });
    }
};
// Get By Title
const getByTitle = async(req,res,next)=>{
    try {
        const { title } = req.params;
        const books = await Books.find({ title });
        const formattedBooks = books.map(book => ({
            id: book._id,
            name: book.name,
            ISBN: book.isbn,
            Author: book.author,
            Title: book.title,
            Review: book.review
          }));
        res.json(formattedBooks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching books' });
    }
};
// Get Book Review
const getBookReview = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Books.findById(id); 

    if (!book) {
      return res.status(404).json({ message: 'Book not found' }); 
    }

    const formattedBook = {
      Review: book.review,
    };

    res.json(formattedBook);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching book' });
  }
};
// Add Modify Review
const addBookReview=async(req,res,next)=>{
  try{
    const { id } = req.params;

    const book = await Books.findById(id); 

    if (!book) {
      return res.status(404).json({ message: 'Book not found' }); 
    }
    const newReview = req.body.review;
    if (newReview) {
      await Books.findByIdAndUpdate(id, { review: newReview });

      res.json({ message: 'Review updated successfully' });
      return;
    }
  }catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error add/modify book review' });
}

}
module.exports = {
    getAllBook,getByISBN,getByAuthor,getByTitle,getBookReview,addBookReview
}