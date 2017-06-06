import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submitFile } from '../actions/ImageActions';

@connect(
  null,
  dispatch => {
    return {
      submitFile(file) {
        dispatch(submitFile(file));
      },
    };
  }
)
export default class UploadImage extends Component {
  constructor() {
    super();
    this.state = {
      file: '',
      imagePreviewUrl: '',
    };
  }

  _onInputChange = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  submit = () => {
    const { file } = this.state;
    this.props.submitFile(file);
  }

  render() {
    return (
      <div className="container">
        <input type="file" onChange={this._onInputChange} />
        <button className="btn btn-default" onClick={this.submit}>Upload</button>
      </div>
    );
  }
}
