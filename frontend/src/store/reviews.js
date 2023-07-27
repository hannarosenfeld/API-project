import { csrfFetch } from "./csrf";
import { getOneSpot } from "./spots";

export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS'
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
export const EDIT_REVIEW = 'reviews/EDIT_REVIEW'

const removeReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId,
});

const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews,
})

const editReviewAction = (review) => ({
  type: EDIT_REVIEW,
  review
})

export const editReviewThunk = (reviewData, reviewId, spotId) => async (dispatch) => {
  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw err;
    }

    const editedReview = await res.json();

    // Dispatch the action with the edited review object
    dispatch(editReviewAction(editedReview));

    // Fetch updated reviews and spot information after the edit
    await dispatch(getReviews(spotId));
    await dispatch(getOneSpot(spotId));

    return editedReview;
  } catch (err) {
    // Handle errors here or rethrow them to be handled in the component
    throw err;
  }
};



export const getReviews = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const reviews = await res.json();

        dispatch(loadReviews(reviews))
    }  else {
        const err = res.json();
        return err;
      }

    return res;
}

export const getReviewsByUser = (userId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/current`);

    if (res.ok) {
      const reviews = await res.json()
      dispatch(loadReviews(reviews))
    } else {
      const err = res.json();
      return err;
    }
}

export const deleteReview = (reviewId, spotId) => async dispatch => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removeReview(reviewId))
    dispatch(getReviews(spotId))
    dispatch(getOneSpot(spotId))
  }
}

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_REVIEWS:
      const reviewsState = {};
      action.reviews.Reviews.forEach(review => {
        reviewsState[review.id] = review;
      });
      return reviewsState;
      case DELETE_REVIEW:
        const newState = { ...state };
        delete newState[action.reviewId];
        return newState;
      case EDIT_REVIEW:
        console.log("action",action)
        return {
          ...state,
          [action.review.id]: action.review
        };
      default:
        return state;
    }
}

export default reviewsReducer;
