import React, { PureComponent } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import '../css/App.css';
import { addBook, removeBook, initial } from '../actions/book'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { filterBy } from '@progress/kendo-data-query';
import { LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
import Delivered from './Delivered'
import Remove from './Remove'
import zhMessages from '../zh-TW.json';
import { Dialog } from '@progress/kendo-react-dialogs';
import InsertForm from './InsertForm'
import swal from 'sweetalert';
import data from '../data.json'
loadMessages(zhMessages, 'zh-TW');
class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      skip: 0,
      take: 10,
      filter: {
        logic: "and",
        filters: [
          { field: "bookName", operator: "contains", value: "" },
          { field: "bookAuthor", operator: "contains", value: "" }
        ]
      },
      visible: false
    }
  }

  componentDidMount(){
   let bookDataFromLocalStorage = JSON.parse(localStorage.getItem('bookData'));
    if (bookDataFromLocalStorage == null) {
        bookDataFromLocalStorage = data;
        localStorage.setItem('bookData', JSON.stringify(bookDataFromLocalStorage));
      }
      this.props.initial(bookDataFromLocalStorage)
  }

  pageChange = (event) => {
    this.setState({
      skip: event.page.skip,
      take: event.page.take
    });
  }

  remove = (book) => {
    this.props.removeBook(book)
  }

  toggleDialog = () => {
    this.setState({
      visible: !this.state.visible
    });
  }

  addBookToUI = (obj) => {
    localStorage.setItem('bookData', JSON.stringify([...this.props.books,obj]))
    this.props.addBook(obj)
    this.setState({
      visible: !this.state.visible
    }, () => {
      swal({
        title: "新增成功!",
        icon: "success",
      });
    });

  }
  render() {
    const { skip, take, filter } = this.state

    return (
      <div className="App">

        {this.state.visible &&
          <Dialog title={"新增書籍"} onClose={this.toggleDialog} minWidth="350px" height={'70vh'} width={'25vw'}>
            <InsertForm addBook={this.addBookToUI} bookLength={this.props.books[this.props.books.length-1].bookId}></InsertForm>
          </Dialog>}
        <AppBar position="static" className="bar">
          <Toolbar>
            <Typography variant="h6" color="inherit" >
              圖書管理系統
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="main">
          <LocalizationProvider language="zh-TW">
            <Grid data={filterBy(this.props.books.slice(skip, take + skip), filter)} skip={skip}
              filterable
              filter={filter}
              onFilterChange={(e) => {
                this.setState({
                  filter: e.filter
                });
              }}
              take={take} total={this.props.books.length}
              pageable={true} onPageChange={this.pageChange}
              style={{ width: "75%" }}
            >

              <GridToolbar>
                <div onClick={this.closeEdit}>
                  <button title="新增書籍" className="k-button k-primary" onClick={this.toggleDialog} >
                    新增書籍
                </button>
                </div>
              </GridToolbar >

              <GridColumn filterable={false}
                cell={(props) => <Remove {...props} remove={this.remove} />}
              />
              <GridColumn field="bookId" title="書籍編號" filterable={false} />
              <GridColumn field="bookName" title="書籍名稱" width="200px" />
              <GridColumn field="bookCategory" title="書籍種類" filterable={false} />
              <GridColumn field="bookAuthor" title="作者" />
              <GridColumn field="bookBoughtDate" title="購買日期" filterable={false} />
              <GridColumn field="bookDeliveredDate" title="送達狀態" filterable={false}
                cell={(props) => <Delivered {...props} />}
              />
              <GridColumn field="bookPrice" format="{0:n}" title="金額" filterable={false} />
              <GridColumn field="bookAmount" format="{0:n}" title="數量" filterable={false} />
              <GridColumn field="bookTotal" format="{0:n}元" title="總計" filterable={false} />
            </Grid>           
          </LocalizationProvider>
        </div>
      </div>
    );
  }
}

function mapStateToProp(state) {
  return {
    books: state.book,
  }
}

export default connect(mapStateToProp, {
  addBook: addBook,
  removeBook: removeBook,
  initial: initial
})(App)