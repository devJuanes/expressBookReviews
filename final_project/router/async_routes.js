const express = require('express');
const asyncBooks = require('../async_books.js');
const router = express.Router();

// Ruta para probar getBooksAsync
router.get('/async/books', async (req, res) => {
  try {
    const books = await asyncBooks.getBooksAsync();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Ruta para probar getBookByISBN
router.get('/async/isbn/:isbn', async (req, res) => {
  try {
    const book = await asyncBooks.getBookByISBN(req.params.isbn);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

// Ruta para probar getBooksByAuthor
router.get('/async/author/:author', async (req, res) => {
  try {
    const books = await asyncBooks.getBooksByAuthor(req.params.author);
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

// Ruta para probar getBooksByTitle
router.get('/async/title/:title', async (req, res) => {
  try {
    const books = await asyncBooks.getBooksByTitle(req.params.title);
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({message: error.message});
  }
});

module.exports = router; 