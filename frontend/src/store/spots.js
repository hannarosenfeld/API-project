import { csrfFetch } from "./csrf";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
const ADD_ONE = 'spots/ADD_ONE';

const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
  });

  export const receiveSpot = (spot) => ({
    type: RECEIVE_SPOT,
    spot,
  });

  const addOneSpot = spot => ({
    type: ADD_ONE,
    spot
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

  export const createSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(spot)
  })
  if (res.ok) {
    const newSpot = await res.json();
    dispatch(addOneSpot(newSpot))
    return newSpot;
  } else {
    const err = res.json();
    console.log("WE ARE HITTING AN ERROR", err)
    return err;
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
      case ADD_ONE:
        if (!state[action.spot.id]) {
          const newState = {
            ...state,
            [action.spot.id]: action.spot
          };
          return newState;
        }
        return {
          ...state,
          [action.spot.id]: {
            ...state[action.spot.id],
            ...action.spot
          }
        };
    default:
      return state;
  }
};

export default spotsReducer;
