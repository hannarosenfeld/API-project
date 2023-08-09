import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../../store/bookings";

import BookingItem from "./BookingItem";

import "./Bookings.css";

export default function Bookings() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const bookings = useSelector(state => state.bookings);
  const bookingsArr = Object.values(bookings);

  useEffect(() => {
    dispatch(getAllBookings(user?.id));
  }, [dispatch, user]);

  return (
    <div className="bookings-wrapper"> 
      {bookingsArr.map(booking => (
        <BookingItem key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
