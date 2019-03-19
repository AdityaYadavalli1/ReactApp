import React, { Component } from 'react';

class TakeQuiz extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            id: [],
            submitted: false,
            submitted2: true,
            submitted3: false,
            score: 0,
            presentScore: 0,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleCChnage = this.handleCChnage.bind(this);
    }

    componentDidMount() {
        const request = new Request('http://127.0.0.1:8080/viewquizzes/');
        fetch(request)
            .then(response => response.json())
                .then(data => this.setState({data: data}));
    }

    handleSubmit (event) {
         event.preventDefault();
        fetch('http://localhost:8080/viewquizzes/'+this.state.id[0], {
            method: 'GET',
        })
          .then(response => response.json())
            .then(data => {
              this.setState({data2: data});
              this.setState({submitted: true});
              this.setState({submitted2: false});
            });
    }
    handleSubmit1 (event){
      event.preventDefault();
      this.setState({submitted3: true});
      var temp = this.state.score;
      this.setState({presentScore: temp});
      console.log({name:sessionStorage.getItem('user'),score:temp*1,gid:this.state.id[2]*1,quizname:this.state.id[1]})
      fetch('http://localhost:8080/leaderboard/', {
          method: 'POST',
          body: JSON.stringify({name:sessionStorage.getItem('user'),score:temp*1,gid:this.state.id[2]*1,quizname:this.state.id[1]}),
      })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          console.log('Posted');
      });
    }
    async handleChange(event) {

        await this.setState({id: JSON.parse(event.target.value)});
        console.log(this.state.id[1])
    }
    handleCChnage(event) {
      var temp = this.state.score;
      if(event.target.checked && event.target.name === event.target.value)
        this.setState({score: temp + 10});
      else if(!event.target.checked && event.target.name === event.target.value)
        this.setState({score: temp - 10});
    }
    render() {
      if(sessionStorage.getItem('user') != null)
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Take a quiz</h1>
                </header>

                {this.state.submitted2 &&
                <form onSubmit={this.handleSubmit}>
                    <ul class="list-group">{this.state.data.map((item) => {
                        return (
                            <li class="list-group-item">
                                <input type="radio" name="personId" value={JSON.stringify([item.id,item.firstname,item.gid])} onChange={this.handleChange}/>
                                &nbsp; {item.id} {item.firstname} {item.gid}
                            </li>
                        )
                    })}
                    </ul>
                    <button type="submit" className="btn btn-default">Submit</button>
                </form>}
                {this.state.submitted &&
                <form onSubmit={this.handleSubmit1}>
                  <div>
                  <table className="table-hover">
                    <thead>
                      <tr>
                        <th>Question</th>
                        <th colspan="2">Option 1</th>
                        <th colspan="2">Option 2</th>
                        <th colspan="2">Option 3</th>
                        <th colspan="2">Option 4</th>
                      </tr>
                    </thead>
                  <tbody class="list-group">{this.state.data2.map((item,key) => {
                      return (
                          <tr key = {key}>
                              <td>{item.question}</td>
                              <td>{item.firstopt}</td>
                              <td><input type="checkbox" name={item.answer} value={item.firstopt} onChange={this.handleCChnage}/>&nbsp;</td>
                              <td>{item.secopt}</td>
                              <td><input type="checkbox" name={item.answer} value={item.secopt} onChange={this.handleCChnage}/>&nbsp;</td>
                              <td>{item.thirdopt}</td>
                              <td><input type="checkbox" name={item.answer} value={item.thirdopt} onChange={this.handleCChnage}/>&nbsp;</td>
                              <td>{item.fourthopt}</td>
                              <td><input type="checkbox" name={item.answer} value={item.fourthopt} onChange={this.handleCChnage}/>&nbsp;</td>
                          </tr>
                      )
                  })}
                    </tbody>
                   </table>
                   <br/>
                  <button type="submit" className="btn btn-default">Submit</button>
                  </div>
                 </form>
              }
              {this.state.submitted3 &&
                <h2> Score:{this.state.presentScore}</h2>
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

export default TakeQuiz;
