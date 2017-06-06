import React, { Component } from 'react';
import { connect } from 'react-redux';
import  { browserHistory, Link } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'
import * as FirebaseActions from '../actions/FirebaseActions';
import { Accordion, Icon } from 'semantic-ui-react';


@connect(state => ({
  loggedIn: state.auth.authenticated,
  user: state.auth.user,
  userTrips: state.user,

}))

export default class ProfilePage extends Component {
  constructor() {
    super();
  }


  render() {
    const  { user, userTrips } = this.props;
    console.log('user', user);
    console.log('userTrips', userTrips);
    return(
      <div  className="cardContainer">
        <Card id='card'  className="col-xs-12 col-sm-4 col-sm-offset-4">
          <CardHeader
            title={user.displayName}
            subtitle={user.email}
            avatar={user.photoURL}
          />

          <CardTitle
            title="Settings"
            // subtitle="Total Miles: alot"
          />
          {/* <CardText>
            stuff
          </CardText> */}
          <div class= 'row'>
            <CardActions>
              <Accordion>


                {/* <Accordion.Title>
                  <FlatButton
                  className='profileBtn'
                  >
                  <i class="material-icons" style={{color: '#966FD6',fontSize: '48px', paddingLeft: '10px', transform: 'translateY(10%)'}}>&#xE55E;</i> Current Trips
                  </FlatButton>
                  </Accordion.Title>
                  <Accordion.Content>{
                  // userTrips.current === false ? <h4>You have no current trips</h4> :

                  <Link to='/my-trips'>{!userTrips.current ? 'test' : userTrips.current.map(trip => (<div><h4>{trip.title}</h4></div>))}</Link>
                  }
                </Accordion.Content> */}



                <Accordion.Title>
                  <FlatButton
                    className='profileBtn'
                  >
                    <i class="material-icons" style={{color: '#77DD77',fontSize: '48px', paddingLeft: '10px', transform: 'translateY(10%)'}}>mail</i> Email
                  </FlatButton>
                </Accordion.Title>
                <Accordion.Content>
                  <h4></h4>

                </Accordion.Content>


                <Accordion.Title>
                  <FlatButton
                    className='profileBtn'
                  >
                    <i class="material-icons" style={{color: '#FFb347',fontSize: '48px', paddingLeft: '10px', transform: 'translateY(10%)' }}>vpn_key</i> Change Password
                  </FlatButton>
                </Accordion.Title>
                <Accordion.Content>

                </Accordion.Content>


                {/* <Accordion.Title>
                  <FlatButton
                  className='profileBtn'
                  >
                  <i class="material-icons" style={{color: '#F49AC2', fontSize: '48px', paddingLeft: '10px', transform: 'translateY(10%)'}}>mode_edit</i> Edit Things
                  </FlatButton>
                  </Accordion.Title>
                  <Accordion.Content>
                  <Link to='/mytrips'><h4>Go to Current Trip</h4></Link>
                  </Accordion.Content>
                */}

                {/* <Accordion.Title>
                  <FlatButton
                  className='profileBtn'
                  >
                  <i class="material-icons" style={{color:'#FF6961',fontSize: '48px', paddingLeft: '10px', transform: 'translateY(10%)'}}>favorite</i> Favorites
                  </FlatButton>
                  </Accordion.Title>
                  <Accordion.Content>
                  <Link to='/mytrips'><h4>Go to Current Trip</h4></Link>
                </Accordion.Content> */}

              </Accordion>
            </CardActions>
          </div>
        </Card>
      </div>
    );
  }
}

ProfilePage.propTypes = {

  user: React.PropTypes.object,
};
