import React from 'react';

const CriticsReviewsList = props => (

  <div className="container-fluid">
    <div className="row">
      <div className="media">
        <div className="media-left">
          <div className="btn-group-vertical" role="group" aria-label="...">
            <button type="button" className="btn-group btn btn-primary btn-lg" role="group" aria-label="...">
              Bookworms <span className="badge">{props.item.aggregateRating}</span>
            </button>
            <button type="button" className="btn-group btn btn-info btn-lg" role="group" aria-label="...">
              Google Books <span className="badge">{props.item.rating}</span>
            </button>
            <button type="button" className="btn-group btn btn-info btn-lg" role="group" aria-label="...">
              Library Thing <span className="badge">{props.item.libThingRating}</span>
            </button>
            <button type="button" className="btn-group btn btn-info btn-lg" role="group" aria-label="...">
              GoodReads <span className="badge">{props.item.gReadsRating}</span>
            </button>         
          </div>
        </div>
        {/* <div className="media-body">
          <h4 className="media-heading">{props.review.user}</h4>
          {props.review.bookReview}
        </div> */}
      </div>
    </div>
  </div>

);

export default CriticsReviewsList;