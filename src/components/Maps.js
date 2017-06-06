import React, { Component } from 'react';

export default class Maps extends Component {
  constructor(props) {
    super(props);
    const { google } = props;

    const directionsService = new google.maps.DirectionsService();
    const directionsDisplay = new google.maps.DirectionsRenderer();

    this.state = {
      directionsDisplay,
      directionsService,
    };
  }

  componentDidMount = () => {
    const { mapRef } = this.refs;
    const { google } = this.props;
    const { directionsDisplay } = this.state;

    const map = new google.maps.Map(mapRef, {
      zoom: 4,
      center: { lat: 41.85, lng: -87.65 },
    });

    directionsDisplay.setMap(map);
    this.updateWaypoints();
  }

  componentDidUpdate() {
    this.updateWaypoints();
  }

  updateWaypoints = () => {
    const { destination, waypoints } = this.props;
    const { directionsDisplay, directionsService } = this.state;

    let pos;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        directionsService.route({
          origin: `${pos.lat}, ${pos.lng}`,
          destination,
          waypoints,
          optimizeWaypoints: false,
          travelMode: 'DRIVING',
        }, (result, status) => {
          if (status === 'OK') {
            directionsDisplay.setDirections(result);
          }
        });
      });
    }
  }

  render() {
    return (
      <div className="col-xs-12 mapContainer">
        <div ref="mapRef" className="mapRef"></div>
      </div>
    );
  }
}
