export function updateSavedTrip(trip, id) {
  return {
    type: 'UPDATE_TRIP',
    payload: { trip, id },
  };
}
