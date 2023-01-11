import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js';
import LibUsersList from './components/LibraryUser.js';
import Menu from './components/Menu.js';
import axios from 'axios';
import Footer from "./components/Footer";


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'authors': [],
      'lib_users': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/authors')
        .then(response => {
          const authors = response.data
              this.setState(
                  {
                    'authors': authors
                  }
              )
        }).catch(error => console.log(error))

      axios.get('http://127.0.0.1:8000/api/users')
        .then(response => {
          const lib_users = response.data
              this.setState(
                  {
                    'lib_users': lib_users
                  }
              )
        }).catch(error => console.log(error))
  }

  render() {
    return(
        <div>
          <Menu />
          <AuthorList authors={this.state.authors} />
          <LibUsersList lib_users={this.state.lib_users} />
          <Footer />
        </div>
    )
  }
}

export default App;

