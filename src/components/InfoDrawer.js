import React, { Component } from 'react';

import { Icon } from 'semantic-ui-react';
import CurrentTripsDisplay from './CurrentTripsDisplay';
import CreateTrip from './CreateTrip';

export default class InfoDrawer extends Component {
  constructor() {
    super();
    this.state = {
      toggle: false,
    };
  }

  toggleClose = (e) => {
    e.preventDefault();
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  render() {
    let { userdata, title } = this.props;

    return (
      <div className="infoDrawerMain">
        <div className='waypointBtnContainer' onClick={this.toggleClose}>
          <button className="waypointBtn"><Icon name="map" /></button>
        </div>
        <div className={`rootDrawerWrapper ${this.state.toggle ? 'hideDrawer' : ''}`} >
          <div className="currWayPointsRootContainer" >
            <div className="drawerBar">
              <div className='closeDrawerBtnContainer' onClick={this.toggleClose}>
                <button className="closeDrawerBtn"><Icon name="arrow right" /></button>
              </div>
              <h3>{title}</h3>
            </div>
            {this.props.title === "WayPoints" ?
              <CurrentTripsDisplay userdata={userdata} />
              :
              <CreateTrip />
            }
          </div>
        </div>
      </div>
    );
  }
}
