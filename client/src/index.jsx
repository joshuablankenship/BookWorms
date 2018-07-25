
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Main from './components/Main.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    // $.ajax({
    //   url: '/items',
    //   success: (data) => {
    //     this.setState({
    //       items: data,
    //     });
    //   },
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
  }

  render() {
    return (
      <div>
        {/* <h1>Bookworms</h1> */}
        
        <Main />
      </div>
      
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));