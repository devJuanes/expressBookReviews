const axios = require('axios');
let books = require("./router/booksdb.js");

// Tarea 10: Obtener todos los libros - Usando función de devolución de llamada asíncrona
const getBooksAsync = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(books);
    }, 1000);
  });
};

// Tarea 11: Buscar por ISBN - Usando Promises
const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const book = books[isbn];
      if (book) {
        resolve(book);
      } else {
        reject(new Error("Libro no encontrado"));
      }
    }, 1000);
  });
};

// Tarea 12: Búsqueda por autor - Usando Async/Await
const getBooksByAuthor = async (author) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksByAuthor = {};
      for (let isbn in books) {
        if (books[isbn].author.toLowerCase().includes(author.toLowerCase())) {
          booksByAuthor[isbn] = books[isbn];
        }
      }
      if (Object.keys(booksByAuthor).length > 0) {
        resolve(booksByAuthor);
      } else {
        reject(new Error("No se encontraron libros de este autor"));
      }
    }, 1000);
  });
};

// Tarea 13: Búsqueda por título - Usando Async/Await
const getBooksByTitle = async (title) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksByTitle = {};
      for (let isbn in books) {
        if (books[isbn].title.toLowerCase().includes(title.toLowerCase())) {
          booksByTitle[isbn] = books[isbn];
        }
      }
      if (Object.keys(booksByTitle).length > 0) {
        resolve(booksByTitle);
      } else {
        reject(new Error("No se encontraron libros con este título"));
      }
    }, 1000);
  });
};

// Función para simular una llamada HTTP externa usando axios
const getExternalBookData = async (isbn) => {
  try {
    // Simulamos una llamada a una API externa
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${isbn}`);
    return response.data;
  } catch (error) {
    throw new Error("Error al obtener datos externos");
  }
};

module.exports = {
  getBooksAsync,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByTitle,
  getExternalBookData
}; 