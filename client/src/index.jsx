import React from 'react';
import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Nav from './components/Nav.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignupPage from './containers/SignUpPage.jsx';
import Main from './components/Main.jsx';
import DATA from './mockData';

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
class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      authenticated: false
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
    });
    this.toggleAuthenticateStatus();
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
  }
  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
      <div>
        
        <Router>
          <div>  
            <Route
              path="/"
              render={props => <Nav {...props} items={this.state.items} 
                handleSearchInput={this.searchForBook.bind(this)} />}
            />
            <Route
              path="/main" 
              // render={props => <Main {...props} items={this.state.items} />}
            />
            

            <PropsRoute exact path="/" component={Nav} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <PrivateRoute path="/main" component={Main}/>
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/signup" component={SignUpPage}/>
            {/* <Route path="/logout" component={LogoutFunction}/> */}
          </div>
        </Router>
      </div>
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));