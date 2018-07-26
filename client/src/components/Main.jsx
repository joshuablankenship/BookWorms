import React from 'react';
import MainList from './MainList.jsx';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom'
import $ from 'jquery';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const Main = props => (
  
<div>

  {/* toggle between Recomendations and Favorites */}
  <div className="container">
    <div className="row" style={{ paddingBottom: "20px" }}>
      <div className="col-md-12 text-center">
        <div className="btn-group btn-group-md" role="group" aria-label="...">
          <button type="button" className="btn btn-default">Recomendations</button>
          <button type="button" className="btn btn-default">Favorites</button>
        </div>
      </div>
    </div>
  </div>
    
  {/* There are {props.items.length} items. */}
    {props.items.map(item => <MainList item={item} key={item.title}/>)}
  {/* <MainList  /> */}
  

</div>  
);
              
export default Main;