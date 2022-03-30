function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let array = [[], []];
  for (let i in books) {
    books[i].borrows[0].returned
      ? array[1].push(books[i])
      : array[0].push(books[i]);
  }
  return array;
}

function getBorrowersForBook(book, accounts) {
  let array = [];
  for (let i in book.borrows) {
    for (let j in accounts) {
      if (book.borrows[i].id === accounts[j].id) array.push(accounts[j]);
    }
  }
  for (let i in array) {
    for (let j in book.borrows) {
      if (array[i].id === book.borrows[j].id) 
      array[i] = {
          ...array[i],
          returned: book.borrows[j].returned,
        };
    }
  }
  return array.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
