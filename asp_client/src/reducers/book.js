import data from '../data'

const initialState = data.map((book)=>{
  let temp = Object.assign({}, book);
      switch (temp.BookCategory) {
        case "database":
          temp.BookCategory="資料庫"
          break;
        case "internet":
          temp.BookCategory="網際網路"
          break;
        case "language":
          temp.BookCategory="語言"
          break;
        case "system":
          temp.BookCategory="系統"
          break;
        case "home":
          temp.BookCategory="家庭"
          break;
        default:
          break;
       }
        return temp;
})
export default (state = initialState, action) => {
    switch (action.type) {
  
    case 'ADD_BOOK':
      return[...state,{ 
        BookId: action.BookId,
        BookName: action.BookName,
        BookCategory: action.BookCategory,
        BookAuthor: action.BookAuthor,
        BookBoughtDate: action.BookBoughtDate,
        BookDeliveredDate: action.BookDeliveredDate,
        BookPrice: action.BookPrice,
        BookAmount: action.BookAmount,
        BookTotal: action.BookTotal
      }];
    case 'REMOVE_BOOK':
      return state.filter(book=>book.BookId!==action.BookId);
    default:
      return state
    }
  }
  
  