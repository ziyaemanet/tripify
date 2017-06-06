const initialState = {
  title: '',
  tags: '',
  description: '',
  picture: '',
  id: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SET_TRIP_INFO':
      return Object.assign({}, action.payload);
    default:
      return state;
  }
}
