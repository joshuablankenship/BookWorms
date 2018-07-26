import React from 'react';
// import ListItem from './ListItem.jsx';

const MainList = props => (
  <div>
    <div className="container">
      <div className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src="https://images.gr-assets.com/books/1474154022l/3.jpg" alt="Harry Potter book cover" height="50%"></img>
          </a>
          <div className="btn-group-vertical" role="group" aria-label="...">
            <button type="button" className="btn-group btn btn-default" role="group" aria-label="...">
              Critic Rating <span className="badge">4</span>
            </button>
            <button type="button" className="btn-group btn btn-default" role="group" aria-label="...">
              User Rating <span className="badge">4</span>
            </button>
            <button type="button" className="btn-group btn btn-default" role="group" aria-label="...">
              Favorite <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
            </button>
          </div>
        </div>
        <div className="media-body">
          <h4 className="media-heading">Harry Potter and the Sorcerer's Stone</h4>
          Harry Potter's life is miserable. His parents are dead and he's stuck with his heartless relatives, who force him to live in a tiny closet under the stairs. But his ...
      </div>
        <div className="media-right">
          <ul className="nav nav-pills">
            <li role="presentation" className="disabled"><a href="#">Open Library</a></li>
            <li role="presentation" className="disabled"><a href="#">Check local library</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default MainList;