
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    
  }

  render() {
    return (
      <div>
        <h1>Bookworms</h1>
        
        <Signup />
      </div>
      
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));