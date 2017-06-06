import React, { Component } from 'react';
import uuid from 'uuid';
import { Grid, Image, Segment, Loader, Accordion, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

import CurrentTrips from './CurrentTrips';
import SavedTrips from './SavedTrips';
import PreviousTrips from './PreviousTrips';
import * as WaypointActions from '../actions/WaypointActions';
import * as TripInfoActions from '../actions/TripInfoActions';
import * as FirebaseActions from '../actions/FirebaseActions';

@connect(state => ({
  tripsData: state.user,
}), dispatch => ({
  setWaypoints(waypoints) {
    dispatch(WaypointActions.setWaypoints(waypoints));
  },
  setTripInfo(tripInfo) {
    dispatch(TripInfoActions.setTripInfo(tripInfo));
  },
  removeTrip(type, id) {
    dispatch(FirebaseActions.removeTrip(type, id));
  },
  createAnyTrip(type, trip) {
    dispatch(FirebaseActions.createAnyTrip(type, trip));
  },
}))

export default class UserTrips extends Component {
  constructor(props) {
    super(props);
  }

  modifyTrip = (type, id) => {
    this.loadTrip(type, id);
    browserHistory.push('/trip/create');
  }

  loadTrip = (type, id) => {
    const { setWaypoints, setTripInfo, tripsData } = this.props;
    const trips = tripsData[type];
    const trip = trips[id];

    setWaypoints(trip.waypoints);

    if (type === 'saved') {
      setTripInfo({
        description: trip.description,
        picture: trip.picture,
        tags: trip.tags,
        title: trip.title,
        id,
      });
    } else {
      setTripInfo({
        description: trip.description,
        picture: trip.picture,
        tags: trip.tags,
        title: trip.title,
        id: '',
      });
    }
  }

  startTripDefault = (type, id) => {
    this.loadTrip(type, id);
    if (type !== 'current') {
      const { tripsData, createAnyTrip } = this.props;
      const trips = tripsData[type];
      const trip = trips[id];
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
    }

    browserHistory.push('/current-trip');
  }

  render() {
    let { currPage, tripsData, removeTrip } = this.props;
    console.log('this:', this);
    let loader = (<div className="topHalfLoader tripLoader">
      <Loader active size="huge" inline="centered" />
      <h4>No trips yet...</h4>
    </div>);

    const currTrips = tripsData[currPage.toLowerCase()];
    console.log('currTrips:', currTrips);
    return (
      <div className="mainUserTripsContainer">
        {currTrips ? null : loader}

        {currPage === 'Current' &&
          <CurrentTrips
            startTrip={this.startTripDefault}
            modifyTrip={this.modifyTrip}
            removeTrip={removeTrip}
            currentTrips={tripsData.current}
          />
        }

        {currPage === 'Previous' &&
          <PreviousTrips
            startTrip={this.startTripDefault}
            modifyTrip={this.modifyTrip}
            removeTrip={removeTrip}
            previousTrips={tripsData.previous}
          />
        }

        {currPage === 'Saved' &&
          <SavedTrips
            startTrip={this.startTripDefault}
            modifyTrip={this.modifyTrip}
            removeTrip={removeTrip}
            savedTrips={tripsData.saved}
          />
        }

      </div>
    ); // end of return
  } // end of render
} // end of class
