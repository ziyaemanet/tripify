import React, { Component } from 'react';
import { connect } from 'react-redux';
import Maps from './Maps';
import { Rating, Loader, Icon } from 'semantic-ui-react';
// import CurrentTripsDisplay from './CurrentTripsDisplay';
import InfoDrawer from './InfoDrawer';

@connect(state => ({
  // currentTrip: state.user,
  tripInfo: state.tripInfo,
  waypoints: state.waypoints,
}))

export default class TripsUnderWay extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    // let { currentTrip } = nextProps;
    // let userTripData = nextProps.currentTrip.saved[Object.keys(nextProps.currentTrip.saved)[0]];
    // let waypoints = userTripData.waypoints;
    // let displayDestination;
    // const displayWaypoints = [];
    //
    // if (waypoints.length) {
    //   const location = waypoints[waypoints.length - 1].geometry.location;
    //   displayDestination = `${location.lat},${location.lng}`;
    // } else {
    //   displayDestination = '';
    // }
    //
    // if (waypoints.length > 1) {
    //   for (let i = 0; i < waypoints.length - 1; i++) {
    //     const location = waypoints[i].geometry.location;
    //     displayWaypoints.push({
    //       location: `${location.lat},${location.lng}`,
    //     });
    //   }
    // }
    //
    // this.setState({
    //   destination: displayDestination,
    //   waypoints: displayWaypoints,
    //   userTripData,
    //   toggle: false,
    // });
  }

    // this.setState({
    //   destination: currentTrip.locEnd.formatted_address,
    //   waypoints: currentTrip.waypoints.map(point => {
    //     return (
    //       { location: point.formatted_address }
    //     ); // end of return statement
    //   }), // end of map
    // }); // end of setState
    // } end of function

  render() {
    console.log('this TripsUnderWay: ', this);
    const { waypoints } = this.props;

    let displayDestination;
    const displayWaypoints = [];

    if (waypoints.length) {
      displayDestination = waypoints[waypoints.length - 1].formatted_address;
    } else {
      displayDestination = '';
    }

    if (waypoints.length > 1) {
      for (let i = 0; i < waypoints.length - 1; i++) {
        displayWaypoints.push({ location: waypoints[i].formatted_address });
      }
    }

    return (
      <div className="underWayWrapper">
        <div className="createTripWrapper">
          {displayDestination ?
            <Maps
              google={window.google}
              destination={displayDestination}
              waypoints={displayWaypoints}
            />
            :
            <div className="topHalfLoader">
              <Loader active size='huge' inline='centered' />
              <h4>Loading Map</h4>
            </div>
          }
        </div>
        <InfoDrawer userdata={waypoints} title={'WayPoints'} />

      </div>
    );
  }
}
