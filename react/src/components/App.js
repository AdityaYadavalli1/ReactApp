import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
import EditPerson from './EditPerson';
import NewPerson from './NewPerson';
import Home from './Home';
import BooPerson from './register'
import LooPerson from './login'
import NewQuiz from './makequizzes'
import ViewQuizzes from './viewquizzes'
import MakeQuestion from './makequestions'
import ViewQuestions from './viewquestions'
import TakeQuiz from './takeaquiz'
import LogPerson from './logout'
import DeleteQuestion from './deletequestions'
import DeleteQuiz from './deletequizzes'
import UpdateQuestion from './updatequestion'
import Leaderboard from './leaderboard'
import MakeGenre from './makegenre'
import ViewGenre from './viewgenre'
import Gleaderboard from './leaderboardbygenre'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      formData: {
        user: "",
      },
    }
  }
  componentDidMount() {
    this.state.formData['user'] = sessionStorage.getItem('user');
    console.log(this.state.formData['user']);
  }
  render() {
    if (sessionStorage.getItem('user') != null && sessionStorage.getItem('user')=="abc")
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                  <li><Link to={'/makequizzes'}>Make a Quiz</Link></li>
                  <li><Link to={'/viewquizzes'}>View Quizzes</Link></li>
                  <li><Link to={'/deletequizzes'}>Delete a Quiz</Link></li>
                  <li><Link to={'/viewquestions'}>View Questions</Link></li>
                  <li><Link to={'/makequestions'}>Make a Question</Link></li>
                  <li><Link to={'/takeaquiz'}>Take a Quiz</Link></li>
                  <li><Link to={'/deletequestions'}>Delete a Question</Link></li>
                  <li><Link to={'/updatequestions'}>Update a Question</Link></li>
                  <li><Link to={'/makegenre'}>Make Genre</Link></li>
                  <li><Link to={'/viewgenre'}>View all Genres</Link></li>
                  <li><Link to={'/leaderboardbygenre'}>Leaderboad by Genre</Link></li>
                  <li><Link to={'/leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/logout'}>Logout</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/register' component={BooPerson} />
                 <Route exact path='/login' component={LooPerson} />
                 <Route exact path='/makequizzes' component={NewQuiz} />
                 <Route exact path='/viewquizzes' component={ViewQuizzes} />
                 <Route exact path='/takeaquiz' component={TakeQuiz} />
                 <Route exact path='/deletequizzes' component={DeleteQuiz} />
                 <Route exact path='/makequestions' component={MakeQuestion} />
                 <Route exact path='/viewquestions' component={ViewQuestions} />
                 <Route exact path='/deletequestions' component={DeleteQuestion} />
                 <Route exact path='/updatequestions' component={UpdateQuestion} />
                 <Route exact path='/makegenre' component={MakeGenre} />
                 <Route exact path='/viewgenre' component={ViewGenre} />
                 <Route exact path='/leaderboard' component={Leaderboard} />
                 <Route exact path='/leaderboardbygenre' component={Gleaderboard} />
                 <Route exact path='/logout' component={LogPerson} />
            </Switch>
          </div>
        </Router>
      </div>
    );
    else if(sessionStorage.getItem('user') != null && sessionStorage.getItem('user')!="abc")
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/viewquizzes'}>View Quizzes</Link></li>
                  <li><Link to={'/viewquestions'}>View Questions</Link></li>
                  <li><Link to={'/takeaquiz'}>Take a Quiz</Link></li>
                  <li><Link to={'/leaderboardbygenre'}>Leaderboad by Genre</Link></li>
                  <li><Link to={'/leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/viewgenre'}>View all Genres</Link></li>
                  <li><Link to={'/logout'}>Logout</Link></li>
                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/EditPerson' component={EditPerson} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path='/register' component={BooPerson} />
                 <Route exact path='/login' component={LooPerson} />
                 <Route exact path='/makequizzes' component={NewQuiz} />
                 <Route exact path='/viewquizzes' component={ViewQuizzes} />
                 <Route exact path='/takeaquiz' component={TakeQuiz} />
                 <Route exact path='/deletequizzes' component={DeleteQuiz} />
                 <Route exact path='/makequestions' component={MakeQuestion} />
                 <Route exact path='/viewquestions' component={ViewQuestions} />
                 <Route exact path='/deletequestions' component={DeleteQuestion} />
                 <Route exact path='/updatequestions' component={UpdateQuestion} />
                 <Route exact path='/viewgenre' component={ViewGenre} />
                 <Route exact path='/leaderboard' component={Leaderboard} />
                 <Route exact path='/leaderboardbygenre' component={Gleaderboard} />
                 <Route exact path='/logout' component={LogPerson} />
            </Switch>
          </div>
        </Router>
      </div>
    );
    else
      return (
        <div>
          <Router>
            <div>
              <nav className="navbar navbar-default">
                <div className="container-fluid">
                  <div className="navbar-header">
                    <Link className="navbar-brand" to={'/'}>React App</Link>
                  </div>
                  <ul className="nav navbar-nav">
                    <li><Link to={'/register'}>Register</Link></li>
                    <li><Link to={'/login'}>Login</Link></li>
                  </ul>
                </div>
              </nav>
              <Switch>
                   <Route exact path='/' component={Home} />
                   <Route exact path='/register' component={BooPerson} />
                   <Route exact path='/login' component={LooPerson} />
              </Switch>
            </div>
          </Router>
        </div>
      );
  }
}

export default App;
