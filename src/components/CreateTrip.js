import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid';
import { browserHistory } from 'react-router';
import { Rating } from 'semantic-ui-react';

import { fetchSearch } from '../actions/ApiActions';
import * as FirebaseActions from '../actions/FirebaseActions';
import * as WaypointActions from '../actions/WaypointActions';
import * as TripInfoActions from '../actions/TripInfoActions';

@connect(state => ({
  results: state.results,
  waypoints: state.waypoints,
  tripInfo: state.tripInfo,
}), dispatch => ({
  fetchSearchResults(searchPackage) {
    dispatch(fetchSearch(searchPackage));
  },
  createNewTrip(trip) {
    dispatch(FirebaseActions.createNewTrip(trip));
  },
  createAnyTrip(type, trip) {
    dispatch(FirebaseActions.createAnyTrip(type, trip));
  },
  setWaypoints(waypoints) {
    dispatch(WaypointActions.setWaypoints(waypoints));
  },
  updateSavedTrip(trip, id) {
    dispatch(FirebaseActions.updateSavedTrip(trip, id));
  },
  setTripInfo(tripInfo) {
    dispatch(TripInfoActions.setTripInfo(tripInfo));
  },
}))

export default class CreateTrip extends Component {
  constructor(props) {
    super(props);
    const { tripInfo } = props;

    this.state = {
      search: false,
      title: tripInfo.title,
      tags: tripInfo.tags,
      description: tripInfo.description,
      picture: tripInfo.picture,
      id: tripInfo.id,
    };
  }

  autoGrow = (e) => {
    e.target.style.height = "5px";
    e.target.style.height = (e.target.scrollHeight)+"px";
  }

  submitForm = (e) => {
    e.preventDefault();
    const searchPackage = {
      trip: this.placesInput.value,
      location: this.locationInput.value,
    };
    this.props.fetchSearchResults(searchPackage);
  }

  addWaypoint = (waypoint) => {
    const { setWaypoints, waypoints } = this.props;
    setWaypoints([...waypoints, waypoint]);
    // this.setState({ waypoints: [...this.state.waypoints, waypoint] });
    this.toggleSearch();
  }

  toggleSearch = () => {
    this.setState({ search: !this.state.search });
  }

  inputChange = (e) => {
    const target = e.target.id;
    if (target === 'title') {
      this.setState({
        title: e.target.value,
      });
    } else if (target === 'tags') {
      this.setState({
        tags: e.target.value,
      });
    } else if (target === 'description') {
      this.setState({
        description: e.target.value,
      });
    } else if (target === 'picture') {
      this.setState({
        picture: e.target.value,
      });
    }
  }

  plusOrder = (i) => {
    const { waypoints, setWaypoints } = this.props;
    if (waypoints.length > 1 && i >= 1) {
      const curr = waypoints[i];
      waypoints[i] = waypoints[i - 1];
      waypoints[i - 1] = curr;
      // this.setState({ waypoints });
      setWaypoints(waypoints);
    }
  }

  minusOrder = (i) => {
    const { waypoints, setWaypoints } = this.props;
    if (waypoints.length > 1 && i < waypoints.length - 1) {
      const curr = waypoints[i];
      waypoints[i] = waypoints[i + 1];
      waypoints[i + 1] = curr;
      // this.setState({ waypoints });
      setWaypoints(waypoints);
    }
  }

  removeWaypoint = (i) => {
    const { waypoints, setWaypoints } = this.props;
    setWaypoints(waypoints.filter((waypoint, index) => !(index === i)));
    // this.setState({ waypoints: waypoints.filter((waypoint, index) => !(index === i)) });
  }

  saveTrip = (type) => {
    const { title, tags, description, picture, id } = this.state;
    const { waypoints, setWaypoints, createNewTrip, updateSavedTrip, setTripInfo, createAnyTrip } = this.props;

  // if (type === 'save')
    if (waypoints.length && title.length && tags.length && description.length) {
      if (type === 'save') {
        createNewTrip({
          title,
          tags,
          description,
          waypoints,
          picture,
          locStart: waypoints[0],
          locEnd: waypoints[waypoints.length - 1],
        });
      } else if (type === 'update') {
        updateSavedTrip({
          title,
          tags,
          description,
          waypoints,
          picture,
          locStart: waypoints[0],
          locEnd: waypoints[waypoints.length - 1],
        }, id);
      }

      if (type === 'start') {
        createAnyTrip('current', {
          title,
          tags,
          description,
          waypoints,
          picture,
          locStart: waypoints[0],
          locEnd: waypoints[waypoints.length - 1],
        });
        setTripInfo({
          title,
          tags,
          description,
          picture,
          id: '',
        });
        browserHistory.push('/current-trip');
      } else {
        setWaypoints([]);
        setTripInfo(null);
        browserHistory.push('/my-trips');
      }
    } else {
      alert('Please add complete trip info or add waypoints!');
    }
  }

  // startTrip = () => {
  //   this.saveTrip();
  //   browserHistory.push();
  // }

  render() {
    console.log('this CreateTrip: ', this);
    const { search, title, description, tags, picture, id } = this.state;
    const { results, waypoints } = this.props;

    return (
      <div>
        {search ?
          <div className="createTripLowHalf">
            <form key={uuid()} onSubmit={this.submitForm} className="wayPointForm ">
              <input key={uuid()} type="text" placeholder="search places..." ref={(input) => { this.placesInput = input; }} required />

              <input key={uuid()} type="text" placeholder="at location..." ref={(input) => { this.locationInput = input; }} required />

              <button className="btn btn-default">Search</button>
            </form>
            <button className="btn btn-default" onClick={this.toggleSearch}>Back To Trip</button>
            <br /><br />
            <div className="search-results">
              {results.map(result => (
                <button key={result.id} className="btn btn-default search-results-button" onClick={() => this.addWaypoint(result)}>
                  <b>{result.name}</b>
                  <br />
                  <Rating icon='star' size="small" defaultRating={result.rating} maxRating={5} disabled />
                  <hr />
                  {result.photos && <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0].photo_reference}&key=AIzaSyCaWpX2l-1xUmYGXzWPTyYONs08LiwHLao` || ''} /> }
                  <hr />
                  <b>Type:</b>
                  <ul>
                    {result.types.map(type => (
                      <li className="search-results-li" key={uuid()}>{type}</li>
                    ))}
                  </ul>
                  <b>Address: </b>
                  {result.formatted_address}
                </button>
              ))}
            </div>
          </div>
          :
          <div >
            <button onClick={() => this.saveTrip('save')} className="btn btn-default">Save as New</button>
            {id ? <button onClick={() => this.saveTrip('update')} className="btn btn-default">Save Changes Only</button> : null}
            <button onClick={() => this.saveTrip('start')} className="btn btn-default">Start Trip</button>
            <button data-toggle="modal" data-target="#galleryModal">Upload Image</button>

            <h3>Trip Info</h3>
            <div className="createInputWrapper">
              <input id="title" type="text" onChange={this.inputChange} value={title} placeholder="enter title" required />

              <input id="tags" type="text" onChange={this.inputChange} value={tags} placeholder="enter search tags" required />

              <textarea id="description" onKeyUp={this.autoGrow} value={description} onChange={this.inputChange} type="text" placeholder="enter description" required />
            </div>

            <h3>Trip Waypoints</h3>
            <button onClick={this.toggleSearch} className="btn btn-default">
              <span className="glyphicon glyphicon-plus" />&nbsp;Add Waypoint
            </button>
            {waypoints.map((waypoint, i) => (
              <div key={waypoint.id} className="panel panel-default">
                <div className="panel-heading">
                  <h3 className="panel-title">{waypoint.name}</h3>
                  <button onClick={() => this.plusOrder(i)} className="btn btn-default"><span className="glyphicon glyphicon-plus-sign" /></button>
                  <button onClick={() => this.minusOrder(i)} className="btn btn-default"><span className="glyphicon glyphicon-minus-sign" /></button>
                  <button onClick={() => this.removeWaypoint(i)} className="btn btn-default"><span className="glyphicon glyphicon-remove-sign" /></button>
                </div>
                <div className="panel-body">
                  {waypoint.formatted_address}
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    );
  }
}

// ModifyTrip.propTypes = {
//   trips: React.PropTypes.shape({
//     trips: React.PropTypes.object,
//   }),
// };
