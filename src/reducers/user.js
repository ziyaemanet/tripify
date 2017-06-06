const initialState = {
  saved: false,
  current: false,
  previous: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_USER_DATA':
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
