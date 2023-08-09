import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";


const loadBookings = (bookings) => ({
  type: LOAD_BOOKINGS,
  bookings
});


export const getAllBookings = (userId) => async dispatch => {
  const response = await csrfFetch(`/api/bookings/current`);

  if (response.ok) {
    const bookings = await response.json();
    console.log("API Response:", bookings); // Log the API response

    dispatch(loadBookings(bookings));
  }
}


const initialState = {};

const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_BOOKINGS:
      const bookingsState = {};
      action.bookings.forEach(booking => {
        bookingsState[booking.id] = booking;
      });
      return bookingsState;
    default:
      return state;
  }
};

export default bookingsReducer;
