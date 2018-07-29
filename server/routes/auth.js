const express = require('express');
const validator = require('validator');
const passport = require('passport');
const db = require('../../database/index.js')
const router = new express.Router();

/**
 * Validate the sign up form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateSignupForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide your name.';
  }
  
  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 8) {
    isFormValid = false;
    errors.password = 'Password must have at least 8 characters.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide your password.';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  const { name, password } = req.body;
  
  db.findUser(name, (err, user) => {
    if (err) {
      console.error(err);
    } else if (user) {
   
       return res.status(418).json({
        success: true,
        message: `Sorry, already a user with the username: ${name}`,
        errors: validationResult.errors
    });

    }else{
    db.saveUser(name, password);
    return res.status(200).json({
      success: true,
      message: validationResult.message,
      errors: validationResult.errors
  });

    }
});
  });

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body);
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    });
  }
  const { name, password } = req.body;
  db.findUser(name, (err, user) => {
    if (err) {
      console.error(err);
    } else if (user) {
     
      if(db.comparePassword(password, user.password)){
        return passport.authenticate('local-login', (err, token, userData) => {
          if (err) {
            if (err.name === 'IncorrectCredentialsError') {
              return res.status(400).json({
                success: false,
                message: err.message
              });
            }
            return res.status(400).json({
              success: false,
              message: 'Could not process the form.'
            });
          }
          return res.json({
            success: true,
            message: 'You have successfully logged in!',
            token,
            user: userData
          });
        })(req, res, next);
    }
    }else{
      return res.status(400).json({
        success: false,
        message: 'Incorrect username or password',
        errors: validationResult.errors
      });

    }
});
   
});

module.exports = router;
