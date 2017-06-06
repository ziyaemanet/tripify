import axios from 'axios';

export function receiveFile(file) {
  // console.log('file:', file)
  return {
    type: 'RECEIVE_FILE',
    payload: { file },
  };
}

export function submitFile(file) {
  const data = new FormData();
  data.append('image', file);
  return dispatch => {
    axios.post('/api/images', data)
      .then(res =>  res.data)
      .then(() => {
        dispatch(receiveFile());
      })
      .catch(console.error);
  };
}
