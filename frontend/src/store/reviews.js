import { csrfFetch } from "./csrf";

export const LOAD_REVIEWS = 'spots/LOAD_REVIEWS'

const loadReviews = (reviews, spotId) => ({
  type: LOAD_REVIEWS,
  reviews,
  spotId
})

export const getReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    console.log("spotId in reducer:", spotId)
    console.log(res)
    if (res.ok) {
        const reviews = await res.json();
        console.log("reviews in thunk: ", reviews, spotId)
        dispatch(loadReviews(reviews, spotId))
    }  else {
        const err = res.json();
        console.log("WE ARE HITTING AN ERROR", err)
        return err;
      }

    return res;
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const reviewsState= {};
      action.reviews.Reviews.forEach(review => {
        reviewsState[review.id] = review;
      });
      return reviewsState;
      default:
        return state;
    }
}

export default reviewsReducer;
