import React from 'react';

const ReviewsList = props => (

  <div className="container-fluid">
    <div className="row">
      <div className="col-md-6">
        <div className="media">
          <div className="media-left">
            <div className="btn-group-vertical" role="group" aria-label="...">
              <button type="button" className="btn-group btn btn-primary btn-sm" role="group" aria-label="...">
                Critic Rating <span className="badge">{props.review.rating}</span>
              </button>
            </div>
          </div>
          <div className="media-body">
            <h4 className="media-heading">{props.review.source}</h4>
            {props.review.text}
          </div>
        </div>
      </div>
      <div className="col-md-6">
      </div>
    </div>
  </div>

);

export default ReviewsList;