// import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Layout from './components/Layout';
import Signup from './components/SignUp';
import ProfilePage from './components/ProfilePage';
import MyTripsPage from './components/MyTripsPage';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import CreateTripWrapper from './components/CreateTripWrapper';
import TripsUnderWay from './components/TripsUnderWay';
import { initAuth } from './actions/FirebaseActions';
import store from './store';
// import CurrentTripsDisplay from './components/CurrentTripsDisplay';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory} >
        <Route path="/" component={Layout} >
          <IndexRoute component={HomePage} />
          <Route path="/search-results" component={ResultsPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/trip/create" component={CreateTripWrapper} />
          <Route path = "/signup" component={Signup} />
          {/* <Route path="/trip/view/:id" component={ModifyTrip} /> */}
          <Route path="/current-trip" component={TripsUnderWay} />
          <Route path="/my-trips" component={MyTripsPage} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

initAuth(store.dispatch);
