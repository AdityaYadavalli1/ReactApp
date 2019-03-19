import React, { Component } from 'react';

class MakeQuestion extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        question: "",
        firstopt: "",
        secopt: "",
        thirdopt: "",
        fourthopt:"",
        qid:"",
        answer:"",
      },
      submitted: false,
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handleFChange = this.handleFChange.bind(this);
    this.handleSChange = this.handleSChange.bind(this);
    this.handleTChange = this.handleTChange.bind(this);
    this.handleFoChange = this.handleFoChange.bind(this);
    this.handleAChange = this.handleAChange.bind(this);
    this.handleQiChange = this.handleQiChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/makequestions/', {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          this.setState({submitted: true});
      });
  }
  handleQChange(event) {
    this.state.formData.question = event.target.value;
  }
  handleFChange(event) {
    this.state.formData.firstopt = event.target.value;
  }
  handleSChange(event) {
    this.state.formData.secopt = event.target.value;
  }
  handleTChange(event) {
    this.state.formData.thirdopt = event.target.value;
  }
  handleFoChange(event) {
    this.state.formData.fourthopt = event.target.value;
  }
  handleAChange(event) {
    this.state.formData.answer = event.target.value;
  }
  handleQiChange(event) {
    this.state.formData.qid = event.target.value*1
  }
  render() {
    if(sessionStorage.getItem('user') != null)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.question} onChange={this.handleQChange}/>
            </div>
            <div className="form-group">
                <label>First Option</label>
                <input type="text" className="form-control" onChange={this.handleFChange}/>
            </div>
            <div className="form-group">
                <label>Second Option</label>
                <input type="text" className="form-control" onChange={this.handleSChange}/>
            </div>
            <div className="form-group">
                <label>Third Option</label>
                <input type="text" className="form-control" onChange={this.handleTChange}/>
            </div>
            <div className="form-group">
                <label>Fourth Option</label>
                <input type="text" className="form-control"  onChange={this.handleFoChange}/>
            </div>
            <div className="form-group">
                <label>Answer</label>
                <input type="text" className="form-control" onChange={this.handleAChange}/>
            </div>
            <div className="form-group">
                <label>Quiz ID</label>
                <input type="text" className="form-control" onChange={this.handleQiChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        {this.state.submitted &&
          <div>
            <h2>
              New question successfully added.
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
export default MakeQuestion;
