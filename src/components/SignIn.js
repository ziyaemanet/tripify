import React, { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from '../actions/FirebaseActions';

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = "Please enter an email.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = "Please enter a password.";
  }

  return errors;
};


class SignIn extends Component {
  googleSignIn = () => {
    this.props.toggle();
    this.props.signInWithGoogle();
  }
  handleFormSubmit = (values) => {
    this.props.signInUser(values);
  };

  renderField = ({ input, label, type, meta: { touched, error } }) => (
    <fieldset className={`form-group ${touched && error ? 'has-error' : ''}`}>
      <label className="control-label">{label}</label>
      <div>
        <input {...input} placeholder={label} className="form-control" type={type} />
        {touched && error && <div className="help-block">{error}</div>}
      </div>
    </fieldset>
  );

  renderAuthenticationError() {
    if (this.props.authenticationError) {
      return <div className="alert alert-danger">{ this.props.authenticationError }</div>;
    }
    return <div></div>;
  }

  render() {
    return (
      <Modal className='modalComponent'
        show={this.props.show}
        onHide={this.props.toggle}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Welcome to Tripify</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          { this.renderAuthenticationError() }

          <form onSubmit={this.props.handleSubmit(this.handleFormSubmit)}>
            <Field name="email" component={this.renderField} className="form-control" type="text" label="Email"/>
            <Field name="password" component={this.renderField} className="form-control" type="password" label="Password"/>

            <div className='row'>
              <button onClick={this.props.toggle } action='submit' className=" btn signBtn">Sign In</button>
              <button className=" btn signBtn">Sign Up</button>
            </div>
          </form>
          {/* <h5>E-mail:</h5>
            <input type="text" />
            <h5>Password:</h5>
          <input type="text" /> */}
        </Modal.Body>
        <Modal.Footer>
          <div className="text-center">
            <div className="row">
              <button
                className="signBtn btn googleSignBtn"
                onClick={this.googleSignIn}
              >
                <h5 className="signInText">Sign in with Google</h5>

                {/* <img
                  className="googleSignImage"
                  onClick={this.googleSignIn}
                  height="40px"
                  src="/google-sign-in.png"
                  alt="google sign in"
                /> */}
              </button>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }
}

SignIn.propTypes = {
  toggle: React.PropTypes.func,
  signInWithGoogle: React.PropTypes.func,
  show: React.PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    authenticationError: state.auth.error
  }
}

export default connect(mapStateToProps, Actions)(reduxForm({
  form: 'login',
  validate
})(SignIn));
