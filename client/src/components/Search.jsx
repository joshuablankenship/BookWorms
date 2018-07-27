import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      toSearchList: false
    };
  }

  handleInputChange(e) {
    this.setState({ value: e.target.value });
  }

  handleOnclick(e) {
    e.preventDefault();
    this.props.handleSearchInput(this.state.value);
    this.setState({ value: '' });
    this.props.reviewToggle();

  }

  handleKeyInput(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.handleSearchInput(this.state.value);
      this.setState({ value: '' });
      this.props.reviewToggle();

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
    </div>       
    );
  }
}

export default Search;