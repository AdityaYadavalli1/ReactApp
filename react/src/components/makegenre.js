import React, { Component } from 'react';

class MakeGenre extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstname: "",
      },
      submitted: false,
    }
    this.handleGChange = this.handleGChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/makegenre/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }
  handleGChange(event) {
    this.state.formData.firstname = event.target.value;
  }
  render() {
    if(sessionStorage.getItem('user') != null)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Genre</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Genre</label>
                <input type="text" className="form-control" value={this.state.firstname} onChange={this.handleGChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        {this.state.submitted &&
          <div>
            <h2>
              New Genre successfully added.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
    else
      return (<h2>Login Please</h2>);
  }
}
export default MakeGenre;
