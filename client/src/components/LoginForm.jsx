import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus
}) => (
  <div className="container">
    <form action="/" onSubmit={onSubmit}>
    <div className="form-group">
      <div className="col-sm-9 col-sm-offset-4">
      <h2 className="card-heading">Login</h2>
      <div>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errors.summary && <p className="error-message">{errors.summary}</p>}
      </div>
      </div>
      </div>
      <div className="form-group">
      <div className="col-sm-9 col-sm-offset-4">
        <TextField
          floatingLabelText="Username"
          name="name"
          errorText={errors.name}
          onChange={onChange}
          value={user.name}
        />
        </div>
      </div>

      <div className="form-group">
      <div className="col-sm-9 col-sm-offset-4">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
          onChange={onChange}
          value={user.password}
        />
        </div>
      </div>

      <div className="form-group">
      <div className="col-sm-9 col-sm-offset-4">
        <RaisedButton type="submit" label="Log in"/>
        </div>
      </div>
      <div className="form-group">
      <div className="col-sm-9 col-sm-offset-4">
      <CardText>Don't have an account? <Link to={'/signup'}>Create one</Link>.</CardText>
      </div>
      </div>
    </form>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;