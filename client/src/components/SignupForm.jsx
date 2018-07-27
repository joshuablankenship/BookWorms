import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import DatePicker from 'material-ui/DatePicker';



const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <div className="container">
    <form  className="form-horizontal" action="/" onSubmit={onSubmit}>
    <div className="col-sm-9 col-sm-offset-4">
      <h2 className="card-heading">Sign Up</h2>
      </div>
      {errors.summary && <p className="error-message">{errors.summary}</p>}

      <div className="form-group">
      <div className="col-sm-9 col-sm-offset-4">
        <TextField
          floatingLabelText="Name"
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
          errorText={errors.password}
          value={user.password}
        />
        </div>
      </div>
      
      <div className="form-group" >
      <div className="col-sm-9 col-sm-offset-4">
          <DatePicker hintText="Birthdate" />
          </div>
        </div>
        <div className="form-group">
        <div className="col-sm-9 col-sm-offset-4">Favorite Genres
        <Checkbox label="Fantasy" />
        <Checkbox label="Science Fiction" />
        <Checkbox label="Mystery" />
        <Checkbox label="Biography" />
        <Checkbox label="Non Fiction" />
        <Checkbox label="Classics" />
        </div>
          </div>
      <div className="button">
      <div className="col-sm-9 col-sm-offset-4">
        <RaisedButton  type="submit" label="Create New Account" />
        </div>
      </div>
      <div className="col-sm-9 col-sm-offset-4">
      <CardText>Already have an account? <Link to={'/login'}>Log in</Link></CardText>
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

export default SignUpForm;
