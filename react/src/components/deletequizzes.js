import React, { Component } from 'react';

class DeleteQuiz extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      id: "",
      user: "",
      submitted: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/viewquizzes/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
    this.state.user = sessionStorage.getItem('user');
  }
  handleSubmit (event) {
       event.preventDefault();
      fetch('http://localhost:8080/viewquizzes/'+this.state.id, {
          method: 'DELETE',
      })
          .then(response => {
              if(response.status >= 200 && response.status < 300)
                  this.setState({submitted: true});
          });
  }
  handleChange(event) {
      this.setState({id: event.target.value});
  }
  render() {
    if(sessionStorage.getItem('user') != null)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete Quiz</h1>
        </header>
        <div>
          <form onSubmit={this.handleSubmit}>
            <table className="table-hover">
              <thead>
                <tr>
                  <th>Delete</th>
                  <th>ID</th>
                  <th>Quiz</th>
                </tr>
              </thead>
              <tbody>{this.state.data.map((item, key) => {
                   return (
                      <tr key = {key}>
                          <td><input type="radio" name="QuizId" value={item.id} onChange={this.handleChange}/>&nbsp;</td>
                          <td>{item.id}</td>
                          <td>{item.firstname}</td>
                      </tr>
                    )
                 })}
              </tbody>
           </table>
           &nbsp;
          <button type="submit" className="btn btn-default">Submit</button>
         </form>
         {this.state.submitted &&
           <div>
             <h2>
              Question successfully deleted.
             </h2>
           </div>
         }
        </div>
      </div>
    );
    else
      return (<h2>Login Please</h2>);
  }
}

export default DeleteQuiz;
