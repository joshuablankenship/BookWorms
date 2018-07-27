import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import routes from './routes.js';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import Nav from './components/Nav.jsx';
import DATA from './mockData';

import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import Logout from './containers/Logout.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import MainPage from './containers/MainPage.jsx';
import Auth from './modules/Auth';
const axios = require('axios');

// remove tap delay, essential for MaterialUI to work properly
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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      authenticated: false
    }
  
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
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    this.setState({
      items: DATA,
    });
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Router>
          <div>
        <Route
              path="/"
              render={props => <Nav {...props} items={this.state.items} 
                handleSearchInput={this.searchForBook.bind(this)} />}
            />

            

            <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <PrivateRoute path="/main" component={MainPage}/>
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/signup" component={SignUpPage}/>
            <Route path="/logout" component={Logout} />
          </div>

        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
