import { csrfFetch } from "./csrf";

const LOAD_BOOKINGS = "bookings/LOAD_BOOKINGS";
const CREATE_BOOKING = "bookings/CREATE_BOOKING";

const createBookingAction = (booking) => ({
  type: CREATE_BOOKING,
  booking,
});

export const createBooking = (spotId, startDate, endDate, userId) => async (dispatch) => {
  const response = await csrfFetch("/api/bookings/current", {
    method: "POST",
    body: JSON.stringify({ spotId, startDate, endDate, userId }),
  });

  if (response.ok) {
    const booking = await response.json();
    dispatch(createBookingAction(booking));
    return booking; // Return the created booking data
  } else {
    // Handle error cases here
    // You can dispatch an error action or throw an error
    console.error("Failed to create booking");
    throw new Error("Failed to create booking");
  }
};

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
      console.log("LOAD_BOOKINGS action dispatched");
      const bookingsState = {};
      action.bookings.forEach(booking => {
        bookingsState[booking.id] = booking;
      });
      return bookingsState;
    case CREATE_BOOKING:
      return {
        ...state,
        [action.booking.id]: action.booking,
      };
    default:
      return state;
  }
};


export default bookingsReducer;
