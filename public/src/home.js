function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc, book) => {
    if (book.borrows[0].returned === false) acc++;
    return acc;
  }, 0);
}

function getMostCommonGenres(books) {
  let array = books.reduce((arr, book) => {
    if (!arr.includes(book.genre)) {
      arr.push(book.genre);
    }
    return arr;
  }, []);
  for (let i in array) {
    array[i] = {
      name: array[i],
      count: 0,
    };
    array[i].count = books.reduce((total, book) => {
      if (book.genre === array[i].name) {
        total++;
      }
      return total;
    }, 0);
  }
  return array
    .sort((genreA, genreB) => genreB.count - genreA.count)
    .slice(0, 5);
}

function getMostPopularBooks(books) {
  let array = books
    .sort((bookA, bookB) =>
      bookA.borrows.length < bookB.borrows.length ? 1 : -1
    )
    .slice(0, 5);
  for (let i in array) {
    array[i] = { name: array[i].title, count: array[i].borrows.length };
  }
  return array;
}

function getMostPopularAuthors(books, authors) {
  let array = authors.map((author) => {
    return {
      authorId: author.id,
      name: `${author.name.first} ${author.name.last}`,
      count: 0,
    };
  });
  for (let i in array) {
    for (let b in books) {
      if (array[i].authorId === books[b].authorId) {
        array[i].count += books[b].borrows.length;
      }
    }
  }
  return _helpCleanArray(array);
}

function _helpCleanArray(array) {
  // Helper function for getMostPopularAuthors
  return array
    .sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1))
    .slice(0, 5)
    .map((author) => {
      return { name: author.name, count: author.count };
    });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
