import React, { Component } from 'react';

class ViewOneQuestion extends Component {
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
    const request = new Request('http://127.0.0.1:8080/viewquestions/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
    this.state.user = sessionStorage.getItem('user');
  }
  handleSubmit (event) {
       event.preventDefault();
      fetch('http://localhost:8080/viewquestions/'+this.state.id, {
          method: 'GET',
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
          <h1 className="App-title">Delete a Question</h1>
        </header>
        {!this.state.submitted &&
        <div>
          <form onSubmit={this.handleSubmit}>
                   return (
                        input type="text" name="QuestionId" value={item.id} onChange={this.handleChange}/>
          <button type="submit" className="btn btn-default">Submit</button>
         </form>
        }
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

export default ViewOneQuestion;
