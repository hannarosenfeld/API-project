import { csrfFetch } from "./csrf";
import { getReviews } from "./reviews";

export const LOAD_SPOTS = 'spots/LOAD_SPOTS';
export const RECEIVE_SPOT = 'spots/RECEIVE_SPOT';
export const ADD_ONE = 'spots/ADD_ONE';
export const ADD_SPOT_IMAGE = 'spots/ADD_SPOT_IMAGE'
export const ADD_REVIEW = 'spots/ADD_REVIEW'
export const UPDATE_SPOT = 'spots/UPDATE_SPOT'
export const DELETE_SPOT = 'spots/DELETE_SPOT'


const removeSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId,
});

const updateSpot = (spot) => ({
  type: UPDATE_SPOT,
  spot
})

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

  const addSpotImage = spotImages => ({
    type: ADD_SPOT_IMAGE,
    spotImages
  });

  const addReview = review => ({
    type: ADD_REVIEW,
    review
  })

  export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      dispatch(removeSpot(spotId))
    }
  }

  export const editSpot = (spot, spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(spot)
    })

    if (res.ok) {
      const editedSpot = await res.json();
      dispatch(updateSpot(editedSpot))
      return editedSpot;
    }
  }

export const getAllSpots = () => async dispatch => {
    const response = await csrfFetch(`/api/spots`);

    if (response.ok) {
      const list = await response.json();
      dispatch(loadSpots(list));
    }
  };

  export const getOneSpot = (spotId) => async dispatch => {
    console.log("🍋 in reducer")
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
      const spot = await response.json();
      console.log("🍙 response ok: ", spot)
      dispatch(receiveSpot(spot))
    }
  }

  export const getAllSpotsByCurrentUser = (userId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/current`)

    if (response.ok) {
      const spots = await response.json();
      dispatch(loadSpots(spots))
    }
  }

  export const createSpot = (spot) => async (dispatch) => {
    try {
  const res = await csrfFetch("/api/spots", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(spot)
  })
  if (res.ok) {
    const newSpot = await res.json();
    dispatch(addOneSpot(newSpot))
    return newSpot;
  } } catch(err){
    const error = err.json();
    console.log("WE ARE HITTING AN ERROR", error)
    return error;
  }
}

export const createReview = (spotId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(review)
  })
  console.log(res)
  if (res.ok) {
    const newReview = await res.json();
    dispatch(addReview(newReview))
    dispatch(getReviews(spotId))
    dispatch(getOneSpot(spotId))
    return newReview;
  } else {
    const err = res.json();
    console.log("WE ARE HITTING AN ERROR", err)
    return err;
  }
}

export const createSpotImage = (spotId, spot) => async (dispatch) => {
  for (let image of spot) {
    console.log("thunk image: ", image)

    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(image)
    })
  }
}


const initialState = {};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      const spotsState= {};
      action.spots.Spots.forEach(spot => {
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
    case ADD_REVIEW: {
      return {
        ...state,
        [action.review.id]: action.review
      };
    }
    case UPDATE_SPOT:
      console.log("action",action)
      return {
        ...state,
        [action.spot.id]: action.spot
      };
      case DELETE_SPOT:
        const newState = { ...state };
        delete newState[action.spotId];
        return newState;
    default:
      return state;
  }
};

export default spotsReducer;
