export default (state = [], action) => {
  switch (action.type) {
    case 'INITIAL_BOOK':
      return action.books.map((book) => {
        let temp = Object.assign({}, book);
        switch (temp.bookCategory) {
          case "database":
            temp.bookCategory = "資料庫"
            break;
          case "internet":
            temp.bookCategory = "網際網路"
            break;
          case "language":
            temp.bookCategory = "語言"
            break;
          case "system":
            temp.bookCategory = "系統"
            break;
          case "home":
            temp.bookCategory = "家庭"
            break;
          default:
            break;
        }
        return temp;
      })
    case 'ADD_BOOK':
      return [...state, {
        bookId: action.bookId,
        bookName: action.bookName,
        bookCategory: action.bookCategory,
        bookAuthor: action.bookAuthor,
        bookBoughtDate: action.bookBoughtDate,
        bookDeliveredDate: action.bookDeliveredDate,
        bookPrice: action.bookPrice,
        bookAmount: action.bookAmount,
        bookTotal: action.bookTotal
      }];
    case 'REMOVE_BOOK':
      return state.filter(book => book.bookId !== action.bookId);
    default:
      return state
  }
}

