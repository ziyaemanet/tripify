import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Grid, Segment, Icon } from 'semantic-ui-react'

import TripsDisplay from './TripsDisplay';
import * as WaypointActions from '../actions/WaypointActions';
import * as TripInfoActions from '../actions/TripInfoActions';
import * as FirebaseActions from '../actions/FirebaseActions';
import * as ApiActions from '../actions/ApiActions';

@connect(state => ({
  data: state.results,
}), dispatch => ({
  setWaypoints(waypoints) {
    dispatch(WaypointActions.setWaypoints(waypoints));
  },
  setTripInfo(tripInfo) {
    dispatch(TripInfoActions.setTripInfo(tripInfo));
  },
  createAnyTrip(type, trip) {
    dispatch(FirebaseActions.createAnyTrip(type, trip));
  },
  clearResults() {
    dispatch(ApiActions.clearResults());
  },
}))

export default class ResultsPage extends Component {
  componentWillUnmount() {
    this.props.clearResults();
  }

  modifyTrip = (id) => {
    this.loadTrip(id);
    browserHistory.push('/trip/create');
  }

  loadTrip = (id) => {
    const { setWaypoints, setTripInfo, data } = this.props;
    const trip = data[id];

    setWaypoints(trip.waypoints);
    setTripInfo({
      description: trip.description,
      picture: trip.picture,
      tags: trip.tags,
      title: trip.title,
      id: '',
    });
  }

  startTripDefault = (id) => {
    this.loadTrip(id);
    const { data, createAnyTrip } = this.props;
    const trip = data[id];
    const waypoints = trip.waypoints;

    createAnyTrip('current', {
      title: trip.title,
      tags: trip.tags,
      description: trip.description,
      waypoints,
      picture: trip.picture,
      locStart: waypoints[0],
      locEnd: waypoints[waypoints.length - 1],
    });

    browserHistory.push('/current-trip');
  }

  render() {
    console.log('this.props.data:', this.props.data);
    return (
      <div>
        <div className='backBtnContainer'>
          <button className="backBtn"><Icon name="arrow left" /></button>
        </div>
        <TripsDisplay
          startTrip={this.startTripDefault}
          modifyTrip={this.modifyTrip}
          results={this.props.data}
        />
      </div>
    )
  }
}

ResultsPage.propTypes = {
  trips: React.PropTypes.shape({
    trips: React.PropTypes.object,
  }),
};
