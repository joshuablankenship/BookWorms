import React from 'react';
// import ListItem from './ListItem.jsx';

const Main = props => (
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
      <a className="navbar-brand" href="#">Bookworms</a>
        {/* <img alt="Brand" src="https://i.pinimg.com/originals/d0/fb/73/d0fb73f0ab79cfc626ee14efaa475ea0.png" height="7%" width="7%"></img> */}

    </div>

      {/* <!-- Collect the nav links, forms, and other content for toggling --> */}
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li className="dropdown">
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
          </li> 
        </ul>
        <form className="navbar-form navbar-left">
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Search"></input>
          </div>
            <button type="submit" className="btn btn-default">Submit</button>
        </form>
          <ul className="nav navbar-nav navbar-right">
            <button type="button" className="btn btn-default navbar-btn">Log out</button>
            {/* <li><a href="#">Link</a></li> */}
            {/* <li className="dropdown">
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
              <ul className="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li role="separator" className="divider"></li>
                <li><a href="#">Separated link</a></li>
              </ul>
            </li> */}
          </ul>
    </div> 
  </div> 
</nav>
  <div className="btn-group" role="group" aria-label="...">
    <button type="button" className="btn btn-default">Recomendations</button>
    <button type="button" className="btn btn-default">Favorites</button>
  </div>
</div>  
);

export default Main;