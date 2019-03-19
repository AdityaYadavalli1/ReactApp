import React, { Component } from 'react';

class Gleaderboard extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        data:[],
        firstName: "",
        gid:"",
      },
      submitted2: true,
      submitted: false,
    }
    this.handleGChange = this.handleGChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:8080/leaderboard/'+this.state.formData.gid*1, {
     method: 'GET',
   })
   .then(response => response.json())
     .then(data => {
       this.setState({data: data});
       this.setState({submitted: true});
       this.setState({submitted2: false});
     });
  }

  handleGChange(event) {
    this.state.formData.gid = event.target.value;
  }
  render() {
    if(sessionStorage.getItem('user') != null)
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Leaderboard by Genre</h1>
        </header>
        <br/><br/>
        {this.state.submitted2 &&
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Genre ID</label>
                <input type="text" className="form-control" value={this.state.gid} onChange={this.handleGChange}/>
            </div>
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
        }
        {this.state.submitted &&
          <div>
          <table className="table-hover">
            <thead>
              <tr>
                <th>Player</th>
                <th>Score</th>
                <th>Quiz Name</th>
              </tr>
            </thead>
            <tbody>{this.state.data.map(function(item, key) {
                 return (
                    <tr key = {key}>
                        <td>{item.name}</td>
                        <td>{item.score}</td>
                        <td>{item.quizname}</td>
                    </tr>
                  )
               })}
            </tbody>
         </table>
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
export default Gleaderboard;
