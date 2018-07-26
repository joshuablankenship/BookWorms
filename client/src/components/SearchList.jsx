import React from 'react';

const SearchList = props => (
  <div>
    <div className="container">
      <div className="media">
        <div className="media-left">
          <a href="#">
            <img className="media-object" src={props.item.coverImage} alt="book cover" height="50%"></img>
          </a>
          <div className="btn-group-vertical" role="group" aria-label="...">
            <button type="button" className="btn-group btn btn-default" role="group" aria-label="...">
              Critic Rating <span className="badge">{props.item.rating}</span>
            </button>
            <button type="button" className="btn-group btn btn-default" role="group" aria-label="...">
              User Rating <span className="badge">{props.item.rating}</span>
            </button>
            <button type="button" className="btn-group btn btn-default" role="group" aria-label="...">
              Favorite <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span>
            </button>
          </div>
        </div>
        <div className="media-body">
          <h4 className="media-heading">{props.item.title}</h4>
          {props.item.longDescript}
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

export default SearchList;