import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js';
import LibUsersList from './components/LibraryUser.js';
import ProjectList from "./components/Project";
import TaskList from "./components/Task";
import WorkerList from "./components/Worker";
import Menu from './components/Menu.js';
import axios from 'axios';
import Footer from "./components/Footer";
import {HashRouter, Route, Link, Switch, Redirect, BrowserRouter} from "react-router-dom";

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'authors': [],
      'lib_users': [],
      'workers': [],
      'projects': [],
      'tasks' : []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/projects')
        .then(response => {
          const projects = response.data
              this.setState(
                  {
                    'projects': projects.results
                  }
              )
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/todo')
        .then(response => {
          const tasks = response.data
              this.setState(
                  {
                    'tasks': tasks.results
                  }
              )
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/workers')
        .then(response => {
          const workers = response.data
              this.setState(
                  {
                    'workers': workers.results
                  }
              )
        }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/authors')
        .then(response => {
          const authors = response.data
              this.setState(
                  {
                    'authors': authors.results
                  }
              )
        }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
          const lib_users = response.data
              this.setState(
                  {
                    'lib_users': lib_users.results
                  }
              )
        }).catch(error => console.log(error))
  }

  render() {
    return(
        <div className="App">
          <BrowserRouter>
              <nav>
                  <ul>
                      <li>
                          <Link to='/'>Tasks</Link>
                      </li>
                      <li>
                          <Link to='/workers'>Workers</Link>
                      </li>
                      <li>
                          <Link to='/projects'>Projects</Link>
                      </li>
                  </ul>
              </nav>
              <Switch>
              <Route exact path='/' component={() => <TaskList tasks={this.state.tasks} />} />
              <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
              <Route exact path='/workers' component={() => <WorkerList workers={this.state.workers} />} />
              <Redirect from='/todo' to='/' />
              <Route component={NotFound404} />
              </Switch>
          </BrowserRouter>
            <Footer />
        </div>
    )
  }
}

export default App;

