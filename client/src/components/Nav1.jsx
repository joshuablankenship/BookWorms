import React from 'react';
import MainList from './MainList.jsx';
import LoginPage from '../containers/LoginPage.jsx';
import Logout from '../containers/Logout.jsx';

import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom'


const Nav2 = props => (
  
<div>
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      {/* <!-- Brand and toggle get grouped for better mobile display --> */}
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <div>
        <Link to="/" className="navbar-brand">Bookworms</Link>
          <img alt="Brand" src="https://i.pinimg.com/originals/d0/fb/73/d0fb73f0ab79cfc626ee14efaa475ea0.png" height="35px" width="35px"></img>
        </div>
      </div>
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login Page</Link></li>
        </ul>
      </div>
  </nav>
  </div>  
);
              
export default Nav2;