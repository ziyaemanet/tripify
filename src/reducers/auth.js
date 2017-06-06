import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR } from '../actions/FirebaseActions';

const initialState = {
  authenticated: false,
  error: null,
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'INIT_AUTH_SUCCESS':
    case 'SIGN_IN_SUCCESS':
      return Object.assign({}, state, {
        authenticated: true,
        user: action.payload,
      });
    case 'SIGN_OUT_SUCCESS':
      return initialState;
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null,
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message,
      };
    default:
      return state;
  }
}
