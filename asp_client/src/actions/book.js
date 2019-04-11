export const addBook = (payload) => ({
  type: 'ADD_BOOK',
  bookId: payload.bookId,
  bookName: payload.bookName,
  bookCategory: payload.bookCategory,
  bookAuthor: payload.bookAuthor,
  bookBoughtDate: payload.bookBoughtDate,
  bookDeliveredDate: payload.bookDeliveredDate,
  bookPrice: payload.bookPrice,
  bookAmount: payload.bookAmount,
  bookTotal: payload.bookTotal
})

export const removeBook = (payload) => ({
  type: 'REMOVE_BOOK',
  bookId: payload.bookId,
})

export const initial = (payload) => ({
  type: 'INITIAL_BOOK',
  books: payload
})