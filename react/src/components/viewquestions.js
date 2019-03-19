import React, { Component } from 'react';

class ViewQuestions extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      user: ""
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/viewquestions/');
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
          <h1 className="App-title">View All Questions</h1>
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <table className="table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Question</th>
                  <th>Option 1</th>
                  <th>Option 2</th>
                  <th>Option 3</th>
                  <th>Option 4</th>
                  <th>Quiz ID</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map(function(item, key) {
                  {console.log(item);}
                   return (
                      <tr key = {key}>
                          <td>{item.id}</td>
                          <td>{item.question}</td>
                          <td>{item.firstopt}</td>
                          <td>{item.secopt}</td>
                          <td>{item.thirdopt}</td>
                          <td>{item.fourthopt}</td>
                          <td>{item.Qid}</td>
                      </tr>
                    )
                 })}
              </tbody>
           </table>
           &nbsp;
          <button type="submit" className="btn btn-default">Submit</button>
         </form>
        </div>
      </div>
    );
    else
      return (<h2>Login Please</h2>);
  }
}

export default ViewQuestions;
