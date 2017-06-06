import axios from 'axios';
import { firebaseDb } from '../firebase';


const usersRef = firebaseDb.ref('users');

function receiveTripsInSaved(trips) {
  return {
    type: 'RECEIVE_TRIPS_IN_SAVED',
    payload: trips,
  };
}

export function geofioreSearchResults(searchPackage) {
  const locQuery = searchPackage.location;

  return (dispatch) => {
    axios.get(`/api/places/location?address=${locQuery}`)
      .then((res) => {
        const location = res.data;
        return location;
      })
      .then((location) => {
        const keyWord = searchPackage.trip;
        const { lat, lng } = location;

        // console.log('location:', location)
        const leftLat = lat - 1.5;
        const rightLat = lat + 1.5;
        const topLng = lng - 1.5;
        const bottomLng = lng + 1.5;

        usersRef.on('value', (snap) => {
          const usersObj = snap.val();
          const trips = [];
          for (const user of Object.keys(usersObj)) {
            const { saved } = usersObj[user];
            if (saved !== false) {
              for (const tripInfo of Object.keys(saved)) {
                const { description, locEnd, locStart, tags, title } = saved[tripInfo];
                const endGeometry = locEnd.geometry;
                const endLocation = endGeometry.location;
                const startGeometry = locStart.geometry;
                const startLocation = startGeometry.location;
                if ((((endLocation.lat <= rightLat) && (endLocation.lat >= leftLat)
                && (endLocation.lng <= bottomLng) && (endLocation.lng >= topLng))
                || ((startLocation.lat <= rightLat) && (startLocation.lat >= leftLat)
                && (startLocation.lng <= bottomLng) && (startLocation.lng >= topLng)))
                && ((tags.includes(keyWord)) || (title.includes(keyWord))
                || (description.includes(keyWord)))) {
                  trips.push(saved[tripInfo]);
                }
              }
            }
          }
          // console.log('trips:', trips)
          dispatch(receiveTripsInSaved(trips));
        });
      })
      .catch(console.error);
  };
}
