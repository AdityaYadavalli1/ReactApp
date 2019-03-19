import React, { Component } from 'react';

class LogPerson extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        password: "",
      },
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    this.setState({submitted: true});
    sessionStorage.removeItem('user');
    console.log(sessionStorage.getItem('user'));
    this.props.history.push('/login');
    window.location.reload()
  }
  handleCChange(event) {
    this.state.formData.password = event.target.value;
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Logout</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
                <button type="submit" className="btn btn-default">Logout</button>
          </form>
        </div>
        {this.state.submitted &&
          <div>
            <h2>
              Old person successfully deleted.
            </h2>
             This has been printed using conditional rendering.
          </div>
        }

      </div>
    );
  }
}
export default LogPerson;
