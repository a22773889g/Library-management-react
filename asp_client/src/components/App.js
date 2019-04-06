import React, { PureComponent } from 'react';
import '@progress/kendo-theme-default/dist/all.css';
import '../css/App.css';

import { addBook, removeBook } from '../actions/book'
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
            { field: "bookName", operator: "contains", value: "" }
        ]
    }
    }
  }

  pageChange = (event) => {
      this.setState({
          skip: event.page.skip,
          take: event.page.take
      });
  }

  remove = (book) =>{
    this.props.removeBook(book)
  }
  
  render() {
    const { skip, take, filter } = this.state

    return (
      <div className="App">

        <AppBar position="static" className="bar">
          <Toolbar>
            <Typography variant="h6" color="inherit" >
              圖書管理系統
            </Typography>
          </Toolbar>
        </AppBar>

        <div className="main">
          <LocalizationProvider language="zh-TW">
              <Grid data={filterBy(this.props.books.slice(skip, take + skip),filter)} skip={skip}
                filterable
                filter={filter}
                onFilterChange={(e) => {
                this.setState({
                    filter: e.filter
                });
                }}
                take={take} total={this.props.books.length} 
                pageable={true} onPageChange={this.pageChange}
                style={{width:"75%"}}
                >

                <GridToolbar>
                <div onClick={this.closeEdit}>
                    <button title="新增書籍" className="k-button k-primary" onClick={this.addRecord} >
                    新增書籍
                </button>
                </div>
                </GridToolbar >

                <GridColumn filterable={false} 
                cell={(props) => <Remove {...props} remove={this.remove}/>}
                />
                <GridColumn field="BookId" title="書籍編號" filterable={false}/>
                <GridColumn field="BookName" title="書籍名稱" width="200px"/>
                <GridColumn field="BookCategory" title="書籍種類" filterable={false}/>
                <GridColumn field="BookAuthor" title="作者"/>
                <GridColumn field="BookBoughtDate" title="購買日期" filterable={false}/>
                <GridColumn field="BookDeliveredDate" title="送達狀態" filterable={false} 
                cell={(props) => <Delivered {...props} />}
                />
                <GridColumn field="BookPrice" format="{0:n}" title="金額" filterable={false}/>
                <GridColumn field="BookAmount" format="{0:n}" title="數量" filterable={false}/>
                <GridColumn field="BookTotal" format="{0:n}元" title="總計" filterable={false}/>
              </Grid>
            </LocalizationProvider>
          </div>
      </div>
    );
  }
}

function mapStateToProp (state){
  return{
    books: state.book,
  }
} 

export default connect(mapStateToProp,{
  addBook: addBook,
  removeBook: removeBook
})(App)