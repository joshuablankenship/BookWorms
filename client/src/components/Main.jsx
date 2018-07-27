import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import MainList from './MainList.jsx';

const Main = ({ items, secretData, user}) => (

    <div>
  
      {/* toggle between Recomendations and Favorites */}
      <div className="container">
        <div className="row" style={{ paddingBottom: '20px' }}>
          <div className="col-md-12 text-center">
            <div className="btn-group btn-group-md" role="group" aria-label="...">
              <button type="button" className="btn btn-default">Recomendations</button>
              <button type="button" className="btn btn-default">Favorites</button>
            </div>
          </div>
        </div>
      </div>
      {/* {this.items} */}
      {/* {this.items.map(item => <MainList item={item} key={item.title} />)} */}
  
    </div>
  );

Main.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Main;
