import React from 'react';
import React, { Component } from 'react';

import injectTapEventPlugin from 'react-tap-event-plugin';

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
import SignUpPage from './containers/SignUpPage.jsx';
import Main from './components/Main.jsx';
import DATA from './mockData';
import Auth from './modules/Auth';
const axios = require('axios');
injectTapEventPlugin();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchedItem: null,
      loggedIn: false
    };
    this.searchForBook = (query) => {
      console.log(query, 'query in index.jsx');
      axios.post('/googleData', {
        query,
      })
        .then((response) => {
          console.log(response.data, 'response in index.jsx');
          // this.state.searchedItem = response.data;
        })
        .catch((error) => {
          console.log(error, 'error in index.jsx');
        });
    };
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items',
    //   success: (data) => {
    this.setState({
      items: DATA,
    });
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
  }

  // searchForBook(query) {
  //   console.log(query, 'query in index.jsx');
  //   axios.post('/googleData', { query })
  //     .then((response) => {
  //       console.log(response.data, 'response in index.jsx');
  //       // this.state.searchedItem = response.data;
  //     })
  //     .catch((error) => {
  //       console.log(error, 'error in index.jsx');
  //     });
  // }

  render() {
    return (
      
      <div>
        <Router>
          <div>
            {/* <Route path="/" component={Nav} items={this.state.items}/> */}
            <Route
              path="/"
              render={props => <Nav {...props} items={this.state.items} handleSearchInput={this.searchForBook.bind(this)} />}
            />
            {/* <Route path="/main" component={Main} /> */}
            <Route
              path="/main"
              render={props => <Main {...props} items={this.state.items} />}
            />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUpPage} />
          </div>
          <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <PrivateRoute path="/dashboard" component={DashboardPage}/>
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/signup" component={SignUpPage}/>
            <Route path="/logout" component={LogoutFunction}/>
        </Router>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
