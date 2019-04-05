import React, { Component } from 'react';
import logo from './logo.svg';
import '@progress/kendo-theme-default/dist/all.css';
import './App.css';

// Import the Grid component.
import { Grid, GridColumn } from '@progress/kendo-react-grid';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {ProductName: "Chai", Price: 10},
        {ProductName: "Chang", Price: 20}
      ],
      title: "Hello from KendoReact!"
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.state.title}</h1>
        </header>
          <Grid data={this.state.data}>
            <GridColumn field="ProductName" title="Product name"/>
            <GridColumn field="Price"/>
          </Grid>
      </div>
    );
  }
}

export default App;