import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Main from './components/Main.jsx';
import DATA from './mockData';
import REVIEWS from './mockReview';

const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      reviews: []
    };
    this.searchForBook = (title) => {
      console.log(title, 'query in index.jsx');
      axios.get('/googleData', {
        params: { title },
      })
        .then((response) => {
          this.setState({ items: [response.data] });
        })
        .catch((error) => {
          console.error(error, 'error in index.jsx');
        });
    };
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items',
    //   success: (data) => {
    this.setState({
      items: DATA,
      reviews: REVIEWS
    });
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
  }

  render() {
    return (
      <div>
        <Router>
          <div>            
            <Route
              path="/"
              render={props => <Nav {...props} items={this.state.items} reviews={this.state.reviews}
                handleSearchInput={this.searchForBook.bind(this)} />}
            />
            <Route
              path="/main"
              render={props => <Main {...props} items={this.state.items} reviews={this.state.reviews}/>}
            />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
