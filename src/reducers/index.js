import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import results from './results';
import auth from './auth';
import user from './user';
import waypoints from './waypoints';
import tripInfo from './tripInfo';


export default combineReducers({ results, auth, user, waypoints, tripInfo, form: formReducer });
