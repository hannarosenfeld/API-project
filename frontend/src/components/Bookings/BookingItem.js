import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";

export default function BookingItem({ booking }) {
  const dispatch = useDispatch();
  const spot = useSelector(state => state.spots[booking.spotId]); // Access spot directly by ID

  useEffect(() => {
    dispatch(getOneSpot(booking.spotId));
  }, [dispatch, booking.spotId]);

  if (!spot) {
    return <div>Loading...</div>; // Render loading indicator if spot data is not available yet
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const start = formatDate(booking.startDate);
  const end = formatDate(booking.endDate);

  return (
    <div className="booking-item">
      { spot && spot[0] && spot[0].spotImages && (
        <img src={spot?.spotImages[0].url} alt="Spot" />
      )}
      <div>
        <h3>{spot.name}</h3>
        <p>
          {start} - {end}
        </p>
      </div>
    </div>
  );
}
