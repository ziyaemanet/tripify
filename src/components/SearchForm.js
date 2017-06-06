import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { geofioreSearchResults } from '../actions/Geofire';

@connect(null, dispatch => ({
  geofioreSearchResults(searchPackage) {
    dispatch(geofioreSearchResults(searchPackage));
  },
}))

export default class SearchForm extends Component {

  submitForm = (e) => {
    e.preventDefault();
    const searchPackage = {
      trip: this.tripsInput.value,
      location: this.locationInput.value,
    };
    this.props.geofioreSearchResults(searchPackage);
    browserHistory.push('/search-results');
  }

  render() {
    return (
      <form onSubmit={this.submitForm} className='searchForm col-xs-8 col-xs-offset-2 col-sm-6 col-sm-offset-3 col-lg-4 col-offset-lg-4'>
        <input className="form-control" size="large" icon="search" type="text" placeholder="Search Trips..." ref={(input) => { this.tripsInput = input; }} />
        <input className="form-control" size="large" icon="search" type="text" placeholder="At Location..." ref={(input) => { this.locationInput = input; }} />
        <button className="btn btn-primary" >Search</button>
      </form>
    );
  }
}

SearchForm.propTypes = {
  fetchSearchResults: React.PropTypes.shape({
    trip: React.PropTypes.string,
    location: React.PropTypes.string,
  }),
};
