import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

class Signup = ({
    onSubmit,
    onChange,
    errors,
    user,
  }) => (
          <div className="container">
            <form className="form-horizontal" role="form" onSubmit={onSubmit}>
                <h2>Signup</h2>
                {errors.summary && <p className="error-message">{errors.summary}</p>}
                <div className="form-group">
                    <label className="col-sm-3 control-label">Username</label>
                    <div className="col-sm-9">
                        <input type="text" placeholder="Username" className="form-control" name="username" onChange={onChange} errorText={errors.password}
          value={user.password}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Password</label>
                    <div className="col-sm-9">
                        <input type="password" placeholder="Password" className="form-control" name="password"  onChange={onChange}
          errorText={errors.password}
          value={user.password}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label">Date of Birth</label>
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
                        <button type="submit" className="btn btn-primary btn-block" label="Create New Account">Signup</button>
                    </div>
                </div>
            </form> 
        </div> 
        );
      
    SignUpForm.propTypes = {
        onSubmit: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        errors: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
      };
  
  // In the ES6 spec, files are "modules" and do not share a top-level scope
  // `var` declarations will only exist globally where explicitly defined
  export default Signup;