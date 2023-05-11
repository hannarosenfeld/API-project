import { csrfFetch } from "./csrf";

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

  export const editSpot = (spot) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
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
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
      const spot = await response.json();
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

export const createReview = (spotId, review) => async (dispatch) => {
  console.log("++++++++++=spotId and review:",spotId, review)
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(review)
  })
  if (res.ok) {
    const newReview = await res.json();
    dispatch(addReview(newReview))
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
    // if (res.ok) {
    //   const newSpotImage = await res.json();
    //   // dispatch(addSpotImage(newSpotImage))
    //   return newSpotImage;
    // } else {
    //   const err = res.json();
    //   console.log("WE ARE HITTING AN ERROR", err)
    //   return err;
    // }
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
          // ?
        }
        case UPDATE_SPOT:
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
