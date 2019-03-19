import React, { Component } from 'react';

class Leaderboard extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/leaderboard/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  render() {
    if(sessionStorage.getItem('user') != null)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leaderboard</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Player</th>
              <th>Score</th>
              <th>Quiz Name</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
            {console.log(item)}
               return (
                  <tr key = {key}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.score}</td>
                      <td>{item.quizname}</td>
                      <td>{item.gid}</td>
                  </tr>
                )
             })}
          </tbody>
       </table>
      </div>
    );
    else {
      return (
        <h2> Login Please </h2>
      )
    }
  }
}

export default Leaderboard;
