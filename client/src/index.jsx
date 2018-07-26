
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
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Main from './components/Main.jsx';
import Nav from './components/Nav.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items',
    //   success: (data) => {
    //     this.setState({
    //       items: data,
    //     });
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
            <Route path="/" component={Nav} />
            <Route path="/main" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </div>
        </Router>
      </div>

    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
