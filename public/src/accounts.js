function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) =>
    nameA.name.last.toLowerCase() > nameB.name.last.toLowerCase() ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  return books.reduce((total, book) => {
    for (let i in book.borrows) {
      if (book.borrows[i].id === account.id) total++;
    }
    return total;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  let array = [];
  books.filter((book) => {
    for (let i in book.borrows) {
      if (
        account.id === book.borrows[i].id &&
        book.borrows[i].returned === false
      ) {
        array.push(book);
      }
    }
  });
  for (let j in array) {
    for (let a in authors) {
      if (array[j].authorId === authors[a].id) {
        array[j].author = authors[a];
      }
    }
  }
  return array;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
