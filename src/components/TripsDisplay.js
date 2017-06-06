import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import uuid from 'uuid';
import { Rating, Loader, Accordion, Button } from 'semantic-ui-react';


export default class TripsDisplay extends Component {
  constructor() {
    super();
  }

  render () {
    const results = this.props.results.length ? this.props.results : [];
    const { startTrip, modifyTrip } = this.props;
    console.log('results:', results)
    return (
        <div className="tripsDisplayWrapper">
          <div className="tripsDisplayInnerWrapper">
            <div className='tripsDisplayContainer'>
              {
                results.map((trip, i) => {
                  return (
                    // image needs another call from the backend
                      <div key={uuid()} className='tripsDisplayInnerContainer' >
                        {/* {!trip.picture.length ?
                          <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${trip.locStart.photos[0].photo_reference}&key=AIzaSyCaWpX2l-1xUmYGXzWPTyYONs08LiwHLao`}/>
                          : <img src={trip.picture} alt=""/>
                          }
                          <Rating icon='star' size="huge" defaultRating={trip.rating} maxRating={5} disabled />
                          <h4>{trip.title}</h4>
                          <p>Description: {trip.description}</p>
                        </div> */}

                        <div className="topResultCard">

                          {!trip.picture.length ?
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${trip.locStart.photos[0].photo_reference}&key=AIzaSyCaWpX2l-1xUmYGXzWPTyYONs08LiwHLao`}/>
                            : <img src={trip.picture} alt=""/>
                          }
                          <h4>{trip.title}</h4>
                          {/* <p>{trip.description}</p> */}

                        </div>

                        <div className="btnResultContainer">
                          <Button onClick={() => startTrip(i)} color="green" size="huge" className="startBtn">
                            <Button.Content>Start</Button.Content>
                          </Button>

                          <Button onClick={() => modifyTrip(i)} color="blue" size="huge" className="modifyBtn">
                            <Button.Content>Modify</Button.Content>
                          </Button>

                        </div>
                        <p className="tripDescription">Description: {trip.description}</p>

                        <h4>WayPoints</h4>
                        {
                          trip.waypoints.map((point) => {
                            return(
                              <div className="waypointResults">

                                <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${point.photos[0].photo_reference}&key=AIzaSyCaWpX2l-1xUmYGXzWPTyYONs08LiwHLao`}/>
                                <h4>{point.name}</h4>
                                <p>{point.formatted_address}</p>
                                <Rating icon='star' size="huge" defaultRating={point.rating} maxRating={5} disabled />

                              </div>
                            )
                          })
                        }

                      </div>
                  )
                }
                )
              }
            </div>
          </div>
        </div>
)
}
}
