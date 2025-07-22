const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Tarea 6: Registrar nuevo usuario
public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({message: "Username y password son requeridos"});
  }

  if (users.find(user => user.username === username)) {
    return res.status(400).json({message: "Usuario ya existe"});
  }

  users.push({username: username, password: password});
  return res.status(200).json({message: "Usuario registrado exitosamente"});
});

// Tarea 1: Obtener la lista de libros disponibles en la tienda
public_users.get('/',function (req, res) {
  return res.status(200).json(books);
});

// Tarea 2: Obtener los libros por ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({message: "Libro no encontrado"});
  }
});
  
// Tarea 3: Obtener todos los libros por Autor
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  const booksByAuthor = {};
  
  for (let isbn in books) {
    if (books[isbn].author.toLowerCase().includes(author.toLowerCase())) {
      booksByAuthor[isbn] = books[isbn];
    }
  }
  
  if (Object.keys(booksByAuthor).length > 0) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res.status(404).json({message: "No se encontraron libros de este autor"});
  }
});

// Tarea 4: Obtener todos los libros en base al Título
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  const booksByTitle = {};
  
  for (let isbn in books) {
    if (books[isbn].title.toLowerCase().includes(title.toLowerCase())) {
      booksByTitle[isbn] = books[isbn];
    }
  }
  
  if (Object.keys(booksByTitle).length > 0) {
    return res.status(200).json(booksByTitle);
  } else {
    return res.status(404).json({message: "No se encontraron libros con este título"});
  }
});

// Tarea 5: Obtener la Reseña del libro
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({message: "Libro no encontrado"});
  }
});

module.exports.general = public_users;
