import React from 'react';

class MainList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
    this.handleOnclick = (e) => {
      e.preventDefault();
      console.log(this.props.item, 'Review item clicked on in MainList');
      this.props.reviewToggle(this.props.item);
      
      // this.props.handleSearchInput(this.state.value);
      // this.setState({ value: '' });

    }
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="media">
            <div className="media-left">
              <a href="#">
                <img className="media-object" src={this.props.item.coverImage} alt="book cover" ></img>
              </a>
              <div className="btn-group-vertical" role="group" aria-label="...">
                <button type="button" className="btn-group btn btn-primary btn-sm" role="group" aria-label="...">
                  Bookworms <span className="badge">{this.props.item.aggregateRating}</span>
                </button>
                <button type="button" className="btn-group btn btn-success btn-sm" role="group" aria-label="...">
                  Google Books <span className="badge">{this.props.item.rating}</span>
                </button>
                <button type="button" className="btn-group btn btn-success btn-sm" role="group" aria-label="...">
                  Library Thing <span className="badge">{this.props.item.libThingRating}</span>
                </button>
                <button type="button" className="btn-group btn btn-success btn-sm" role="group" aria-label="...">
                  GoodReads <span className="badge">{this.props.item.gReadsRating}</span>
                </button>
                <button type="button" className="btn-group btn btn-info btn-sm" role="group" aria-label="...">
                  User Rating <span className="badge">{this.props.item.rating}</span>
                </button>
                <button type="button" className="btn-group btn btn-warning btn-sm" role="group" aria-label="..."
                  onClick={this.handleOnclick.bind(this)}
                >
                  Review 
                  {/* <span className="glyphicon glyphicon-star-empty" aria-hidden="true"></span> */}
                </button>
              </div>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{this.props.item.title}</h4>
              {this.props.item.longDescript}
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
  }
} 

export default MainList;