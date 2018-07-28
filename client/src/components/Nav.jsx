import React from 'react';
import MainList from './MainList.jsx';
import ReviewList from './ReviewsList.jsx';
import Search from './Search.jsx';
import LoginPage from '../containers/LoginPage.jsx';
import Logout from '../containers/Logout.jsx';
import Reviews from './Reviews.jsx';
import { NavDropdown, MenuItem } from 'react-bootstrap';




import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom'


class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
    this.handleGenreSelect = (e) => {
      console.log('genre selected');
      console.log(e, 'e');
      // console.log(e, )
      this.props.handleSearchByGenre(e);

      // e.preventDefault();
      // this.props.handleSearchInput(this.state.value);
      // this.setState({ value: '' });
    }
  }
  render() {
    return (
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
                <Link to="/main" className="navbar-brand">Bookworms</Link>
                <img alt="Brand" src="https://i.pinimg.com/originals/d0/fb/73/d0fb73f0ab79cfc626ee14efaa475ea0.png" height="35px" width="35px"></img>
              </div>
            </div>

            {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">

                <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
                  <MenuItem eventKey={"fantasy"} onSelect={this.handleGenreSelect.bind(this)} >Fantasy</MenuItem>
                  <MenuItem eventKey={3.2}>Another action</MenuItem>
                  <MenuItem eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.4}>Separated link</MenuItem>
                </NavDropdown>

                {/* <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Genre <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" className="divider"></li>
              <li><a href="#">Separated link</a></li>
              <li role="separator" className="divider"></li>
              <li><a href="#">One more separated link</a></li>
            </ul>
          </li> */}

              </ul>
              <form className="navbar-form navbar-left">
                <Search handleSearchInput={this.props.handleSearchInput} reviewToggle={this.props.reviewToggle} />
              </form>
              <ul className="nav navbar-nav navbar-right">
                {/* <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login Page</Link></li> */}
                <li><Link to="/logout">Log out</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        {console.log(this.props.items, 'this.props.items in Nav')}
        {this.props.reviewToggled ? this.props.items.map(item => <Reviews item={item} key={item.title} reviews={this.props.reviews} />)
          : this.props.items.map(item => <MainList item={item} key={item.title} reviewToggle={this.props.reviewToggle} />)}

      </div>
    );


    
  }
} 
  

              
export default Nav;