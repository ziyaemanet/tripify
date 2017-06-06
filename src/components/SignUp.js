import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as Actions from '../actions/FirebaseActions';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter an email.';
  }
   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Please enter a password.';
  }
  if (!values.passwordConfirmation) {
    errors.passwordConfirmation = 'Please enter a password confirmation.';
  }
  if (values.password !== values.passwordConfirmation) {
    errors.password = 'Passwords do not match';
  }
  return errors;
};

class Signup extends React.Component {
  handleFormSubmit = (values) => {
    this.props.signUpUser(values);
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (

        <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
          <label  className='control-label'>{label}</label>
          <div>
            <input
              {...input}
              placeholder={label}
              className="form-control"
              // onChange={(input)=> { this[`input${label.toLowerCase().replace(/ /g,'')}`] = input   }}
              type={type}
            />

            {touched && error && <div className='help-block'>{error}</div>}
            {console.log('input: ', input)}
          </div>
        </fieldset>

  );

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className='alert alert-danger'>{this.props.authenticationError }</div>
    }
    return <div />;
  }

  render() {
    return (
      <div className="container">
        <div className='col-md-6 cold-md-offset-3'>
          <h2 className='text-center'>Sign Up</h2>

          { this.renderAuthenticationError() }

          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name='email' type='text' component={this.renderField} label='Email' />
            <Field name='password' type='password' component={this.renderField} label='Password' />
            <Field name='passwordConfirmation' type='password' component={this.renderField} label='Password Confirmation' />
            <button action='submit' className='btn btn-primary'>Sign Up</button>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error,
  };
}

export default connect(mapStateToProps, Actions)(reduxForm({ form: 'signup', validate })(Signup));
