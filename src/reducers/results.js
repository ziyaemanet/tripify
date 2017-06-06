export default function results(state = [], action) {
  switch (action.type) {
    // FUlFILLED at the end if using redux-promise-middleware
    case 'RECEIVE_SEARCH_RESULTS_FULFILLED':
      return action.payload.data;
    case 'RECEIVE_TRIPS_IN_SAVED':
      return action.payload;
    case 'CLEAR_RESULTS':
      return [];
    default:
      return state;
  }
}
