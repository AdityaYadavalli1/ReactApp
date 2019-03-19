import React, { Component } from 'react';

class NewQuiz extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstName: "",
        gid:"",
      },
      submitted: false,
    }
    this.handleFChange = this.handleFChange.bind(this);
    this.handleGChange = this.handleGChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/makequizzes/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }

  handleFChange(event) {
    this.state.formData.firstName = event.target.value;
  }
  handleGChange(event) {
    this.state.formData.gid = event.target.value;
  }
  render() {
    if(sessionStorage.getItem('user') != null)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Quiz</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Quiz Name</label>
                <input type="text" className="form-control" value={this.state.firstName} onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Genre ID</label>
                <input type="text" className="form-control" value={this.state.gid} onChange={this.handleGChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New Quiz successfully added.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
    else {
      return (
        <h2> Login Please </h2>
      )
    }
  }
}
export default NewQuiz;
