export function setWaypoints(waypoints) {
    console.log('waypoints:', waypoints);
  return {
    type: 'SET_WAYPOINTS',
    payload: waypoints,
  };
}
