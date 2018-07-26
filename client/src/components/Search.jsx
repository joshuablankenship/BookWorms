import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
    // console.log(props, 'props in Search.jsx');
  }

  // handleInputChange(e) {
  //   this.setState({ value: e.target.value });
  //   this.props.handleSearchInput(e.target.value);
  //   // console.log(this.state.value, 'this.state.value');
  // }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
    // this.props.handleSearchInput(e.target.value);
    // console.log(this.state.value, 'this.state.value');
  }

  handleOnclick() {
    this.props.handleSearchInput(this.state.value);
    this.setState({ value: '' });
  }

  handleKeyInput(e) {
    if (e.key === 'Enter') {
      this.props.handleSearchInput(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    return (
    <div>
      <div type="text" className="form-group">
        <input className="form-control" placeholder="Search"
          type="text" value={this.state.value}
          onKeyPress={this.handleKeyInput.bind(this)}
          onChange={this.handleInputChange.bind(this)} />
      </div>
      <button type="submit" className="btn btn-default" onClick={this.handleOnclick.bind(this)}>Submit</button>
          {/* <span className="glyphicon glyphicon-search"></span> */}
    </div>       

      // <div className="search-bar form-inline">
      //   <input className="form-control"
      //     type="text" value={this.state.value}
      //     onKeyPress={this.handleKeyInput.bind(this)}
      //     onChange={this.handleInputChange.bind(this)} />
      //   <button className="btn hidden-sm-down" onClick={this.handleOnclick.bind(this)}>
      //     <span className="glyphicon glyphicon-search"></span>
      //   </button>
      // </div>
    );
  }
}

export default Search;