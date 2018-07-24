import React from 'react';
import ReactDOM from 'react-dom';

class Login extends React.Component {
    constructor () {
        super();
        this.state = {
          username: '',
          password: ''
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
          <div className="container">
            <form className="form-horizontal" role="form">
                                                 <h2>Login</h2>
                <div className="form-group">
                    <label  className="col-sm-3 control-label">Username</label>
                    <div className="col-sm-9">
                        <input type="email" placeholder="Username" className="form-control" name="username" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Password</label>
                    <div className="col-sm-9">
                        <input type="password" placeholder="Password" className="form-control" name="password" onChange={this.handleChange}/>
                    </div>
                </div>
                 
                <div className="form-group">
                    <div className="col-sm-9 col-sm-offset-3">
                        <button type="submit" className="btn btn-primary btn-block">Login</button>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-9 col-sm-offset-11">
                    <a href="/signup" className="btn btn-lg link-btn">Sign Up</a>

                    </div>
                </div>
                
            </form> 
        </div> 
        );
      }
    }
      
  
  // In the ES6 spec, files are "modules" and do not share a top-level scope
  // `var` declarations will only exist globally where explicitly defined
  export default Login;