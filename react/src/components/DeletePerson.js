import React, { Component } from 'react';
import './DeletePerson.css';

class DeletePerson extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id: "",
            submitted: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/people/');
        fetch(request)
            .then(response => response.json())
                .then(data => this.setState({data: data}));
    }

    handleSubmit (event) {
         event.preventDefault();
        fetch('http://localhost:8080/people/'+this.state.id, {
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
                    <h1 className="App-title">Delete a Person</h1>
                </header>

                <form onSubmit={this.handleSubmit}>
                <table className="table-hover">
                  <thead>
                    <tr>
                      <th>Check</th>
                      <th>ID</th>
                      <th>FirstName</th>
                      <th>LastName</th>
                    </tr>
                  </thead>
                    <tbody class="list-group">{this.state.data.map((item,key) => {
                        return (
                          <tr key = {key}>
                          <td><input type="radio" name="personId" value={item.id} onChange={this.handleChange}/>&nbsp;</td>
                          <td>{item.id}</td>
                          <td>{item.firstname}</td>
                          <td> {item.lastname}</td>
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
                     Person successfully deleted.
                    </h2>
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

export default DeletePerson;
