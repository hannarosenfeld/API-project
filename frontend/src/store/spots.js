import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'reports/RECEIVE_SPOT';

const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
  });

  export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot,
  });

const initialState = {};

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
      const list = await response.json();
      dispatch(loadSpots(list));
    }
  };

  export const getOneSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
      const spot = await response.json();
      dispatch(receiveSpot(spot))
    }
  }

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState= {};
      const spotsArr = Object.values(action.spots.Spots)
      spotsArr.forEach(spot => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    case RECEIVE_SPOT:
      return { ...state, [action.spot.id]: action.spot };
    default:
      return state;
  }
};

export default spotsReducer;
