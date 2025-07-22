const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  return users.find(user => user.username === username) !== undefined;
}

const authenticatedUser = (username,password)=>{ //returns boolean
  return users.find(user => user.username === username && user.password === password) !== undefined;
}

// Tarea 7: Iniciar sesión como usuario registrado
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({message: "Username y password son requeridos"});
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });

    req.session.authorization = {
      accessToken, username
    }
    return res.status(200).json({message: "Usuario logueado exitosamente"});
  } else {
    return res.status(401).json({message: "Credenciales inválidas"});
  }
});

// Tarea 8: Añadir/Modificar una reseña de libro
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({message: "Libro no encontrado"});
  }

  if (!review) {
    return res.status(400).json({message: "La reseña es requerida"});
  }

  if (!books[isbn].reviews) {
    books[isbn].reviews = {};
  }

  books[isbn].reviews[username] = review;
  return res.status(200).json({message: "Reseña añadida/modificada exitosamente"});
});

// Tarea 9: Eliminar la reseña de un libro añadida por ese usuario en particular
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization.username;

  if (!books[isbn]) {
    return res.status(404).json({message: "Libro no encontrado"});
  }

  if (!books[isbn].reviews || !books[isbn].reviews[username]) {
    return res.status(404).json({message: "No se encontró reseña de este usuario para este libro"});
  }

  delete books[isbn].reviews[username];
  return res.status(200).json({message: "Reseña eliminada exitosamente"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
