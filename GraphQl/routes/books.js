const { v4: uuidv4 } = require('uuid');
const { readJson, writeJson } = require('../db/connection');

const BOOK_FILE = 'books.json';

function getBooks() {
  return readJson(BOOK_FILE);
}

function saveBooks(books) {
  writeJson(BOOK_FILE, books);
}

const bookResolvers = {
  Query: {
    books: () => getBooks(),
    book: (_, { id }) => getBooks().find((book) => book.id === id) || null,
  },
  Mutation: {
    createBook: (_, { input }) => {
      const books = getBooks();
      const newBook = {
        id: uuidv4(),
        title: input.title,
        author: input.author,
        publishedYear: input.publishedYear,
      };
      books.push(newBook);
      saveBooks(books);
      return newBook;
    },
    updateBook: (_, { id, input }) => {
      const books = getBooks();
      const index = books.findIndex((book) => book.id === id);
      if (index === -1) {
        throw new Error('Book not found');
      }
      const updated = {
        ...books[index],
        ...input,
      };
      books[index] = updated;
      saveBooks(books);
      return updated;
    },
    deleteBook: (_, { id }) => {
      const books = getBooks();
      const index = books.findIndex((book) => book.id === id);
      if (index === -1) {
        return false;
      }
      books.splice(index, 1);
      saveBooks(books);
      return true;
    },
  },
};

module.exports = bookResolvers;
