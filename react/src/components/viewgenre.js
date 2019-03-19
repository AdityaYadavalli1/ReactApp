import React, { Component } from 'react';

class ViewGenre extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      user: ""
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/viewgenre/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
    this.state.user = sessionStorage.getItem('user');
  }

  render() {
    if(sessionStorage.getItem('user') != null)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">View All Genres</h1>
        </header>
        <div>
            <table className="table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Genre</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map(function(item, key) {
                  {console.log(item);}
                   return (
                      <tr key = {key}>
                          <td>{item.id}</td>
                          <td>{item.firstname}</td>
                      </tr>
                    )
                 })}
              </tbody>
           </table>
           &nbsp;
        </div>
      </div>
    );
    else
      return (<h2>Login Please</h2>);
  }
}

export default ViewGenre;
