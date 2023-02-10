import React from 'react';
import logo from './logo.svg';
import './App.css';
import ProjectList from "./components/Project";
import TaskList from "./components/Task";
import WorkerList from "./components/Worker";
import axios from 'axios';
import Footer from "./components/Footer";
import {HashRouter, Route, Link, Switch, Redirect, BrowserRouter} from "react-router-dom";
import LoginForm from './components/Auth.js'
import Cookies from "universal-cookie";

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
            'workers': [],
            'projects': [],
            'tasks': [],
            'token': ''
        }
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, ()=>this.load_data())
    }

    is_authenticated() {
        return this.state.token != ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, ()=>this.load_data())
    }
    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {username: username, password:password})
            .then(response => {this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json',
        }
    if (this.is_authenticated())
        {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }
    load_data() {
        const headers = this.get_headers()
        console.log(headers)
        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
            const projects = response.data
                this.setState(
                    {
                        'projects': projects.results
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({projects: []})
        })

        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
            const tasks = response.data
                this.setState(
                    {
                        'tasks': tasks.results
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({tasks: []})
        })

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
            const workers = response.data
                this.setState(
                    {
                        'workers': workers.results
                    }
                )
            }).catch(error => {
            console.log(error)
            this.setState({workers: []})
        })
    }
    componentDidMount() {
        this.get_token_from_storage()
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
                        <li>
                            {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> :
                            <Link to='/login'>Login</Link>}
                        </li>
                    </ul>
                </nav>
                <Switch>
                <Route exact path='/' component={() => <TaskList tasks={this.state.tasks} />} />
                <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects} />} />
                <Route exact path='/workers' component={() => <WorkerList workers={this.state.workers} />} />
                <Route exact path='/login' component={() => <LoginForm
                    get_token={(username, password) => this.get_token(username, password)} />} />
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

