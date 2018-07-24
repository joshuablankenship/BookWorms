import React from 'react';
import ReactDOM from 'react-dom';

class Signup extends React.Component {
    constructor () {
        super();
        this.state = {
          username: '',
          password: '',
          age: ''
        };
        this.handleChange = this.handleChange.bind(this);
      }
      
      handleChange (event) {
        // check it out: we get the event.target.name (which will be either "username" or "password")
        // and use it to target the key on our `state` object with the same name, using bracket syntax
        this.setState({ [event.target.name]: event.target.value });
        console.log(event.target.value);
      }
      
      render () {
        return (
          <form>
          <div>
            <label>Username</label>
            <input type="text" name="username" onChange={this.handleChange} />
            </div>
            <div>
            <label>Password</label>
            <input type="password" name="password" onChange={this.handleChange} />
            
          </div>
          <div>
            <label>Age</label>
            <input type="text" name="age" onChange={this.handleChange} />
            <button className="btn hidden-sm-down">Signup
          </button>
            </div>
          </form>
        );
      }
    }
  
  // In the ES6 spec, files are "modules" and do not share a top-level scope
  // `var` declarations will only exist globally where explicitly defined
  export default Signup;