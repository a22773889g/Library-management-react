export const addBook = (payload) => ({
    type: 'ADD_BOOK',
    BookId: payload.BookId,
    BookName: payload.BookName,
    BookCategory: payload.BookCategory,
    BookAuthor: payload.BookAuthor,
    BookBoughtDate: payload.BookBoughtDate,
    BookDeliveredDate: payload.BookDeliveredDate,
    BookPrice: payload.BookPrice,
    BookAmount: payload.BookAmount,
    BookTotal: payload.BookTotal
  })

export const removeBook = (payload) => ({
    type: 'REMOVE_BOOK',
    BookId: payload.BookId,
  })