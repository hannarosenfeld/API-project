import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';

const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
  });

const initialState = {};

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
      const list = await response.json();
      console.log(list)
      dispatch(loadSpots(list));
    }
  };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState= {};
      action.spots.forEach(spot => {
        spotsState[spot.id] = spot;
      });
      return spotsState;
    default:
      return state;
  }
};

export default spotsReducer;
