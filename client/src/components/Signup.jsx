import React from 'react';
import ReactDOM from 'react-dom';

class Signup extends React.Component {
    constructor () {
        super();
        this.state = {
          username: '',
          password: '',
          birthDate: '',
          fantasy: ''
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
                <h2>Signup</h2>
                <div className="form-group">
                    <label for="email" className="col-sm-3 control-label">Username</label>
                    <div className="col-sm-9">
                        <input type="email" placeholder="Username" className="form-control" name="username" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="password" className="col-sm-3 control-label">Password</label>
                    <div className="col-sm-9">
                        <input type="password" placeholder="Password" className="form-control" name="password" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label for="birthDate" className="col-sm-3 control-label">Date of Birth</label>
                    <div className="col-sm-9">
                        <input type="date" id="birthDate" className="form-control" name="birthDate" onChange={this.handleChange}/>
                    </div>
                </div>
                
                
                <div className="form-group">
                    <label className="control-label col-sm-3">Favorite Genres</label>
                    <div className="col-sm-9">
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" id="fantasyCheckbox" name="fantasy" onChange={this.handleChange}/>Fantasy
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" id="mysteryCheckbox" value="Low salt"/>Mystery
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" id="classicsCheckbox" value="Low salt"/>Classics
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" id="historyCheckbox" value="Low salt"/>History
                            </label>
                        </div>
                        <div className="checkbox">
                            <label>
                                <input type="checkbox" id="sfCheckbox" value="Low salt"/>Science Fiction
                            </label>
                        </div>
                    </div>
                </div>
                 
                <div className="form-group">
                    <div className="col-sm-9 col-sm-offset-3">
                        <button type="submit" className="btn btn-primary btn-block">Signup</button>
                    </div>
                </div>
            </form> 
        </div> 
        );
      }
    }
  
  // In the ES6 spec, files are "modules" and do not share a top-level scope
  // `var` declarations will only exist globally where explicitly defined
  export default Signup;