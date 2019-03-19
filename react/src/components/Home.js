import React, { Component } from 'react';
import NewComponent from './NewComponent';
import './Home.css'

class Home extends Component {
  render() {
    if(sessionStorage.getItem('user') != null)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <NewComponent text={"This text comes from another component called newComponent.js"}/>
      </div>
    );
    else {
      return (
        <h2> Login Please </h2>
      )
    }
  }
}

export default Home;
