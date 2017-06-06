import React, { Component } from 'react';
import UserTrips from './UserTrips';


export default class MyTripsPage extends Component {
  constructor() {
    super();
    this.state = {
      currMenu: 'Current',
    };
  }

  selectNav = (e) => {
    this.setState({
      currMenu: e.target.innerHTML,
    });
  }

  render() {


    const { currMenu } = this.state;
    return (
      <div className="container-fluid myTripsMainContainer">
        <div>
          <label>{currMenu} Trips</label>
        </div>
        <div className="userTripsWrapper">
          <UserTrips currPage={currMenu}  />
          
        </div>

        <div className="row myTripsNavbar">
          <div
            className={`col-xs-4 myTripsNavItem ${currMenu === 'Previous' ? 'selected' : ''}`}
            onClick={this.selectNav}>Previous</div>
          <div
            className={`col-xs-4 myTripsNavItem ${currMenu === 'Current' ? 'selected' : ''}`}
            onClick={this.selectNav}>Current</div>
          <div
            className={`col-xs-4 myTripsNavItem ${currMenu === 'Saved' ? 'selected' : ''}`}
            onClick={this.selectNav}>Saved</div>
        </div>
            </div>
          );
        }
      }
