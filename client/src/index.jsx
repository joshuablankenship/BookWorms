
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Nav from './components/Nav.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Main from './components/Main.jsx';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom'
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
        {/* <h1>Bookworms</h1> */}
        <Router>
		<div>
			
      <Route path="/" component={Nav}/>
      <Route path="/main" component={Main}/>
			<Route path="/login" component={Login}/>
			<Route path="/signup" component={Signup}/>
		</div>
    </Router>
      </div>
      
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));