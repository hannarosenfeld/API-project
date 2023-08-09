import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getOneSpot } from "../../store/spots"


function BookingItem({ booking }) {
    const dispatch = useDispatch();
    const spotObj = useSelector(state => state.spots);
    const spot = Object.values(spotObj)

    useEffect(() => {
        dispatch(getOneSpot(booking.spotId))
    }, [])

    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
      }

    const start = formatDate(booking.startDate);
    const end = formatDate(booking.endDate)

    return(
        <div>
            <h2>Your Bookings: </h2>
            <div className="booking-item">
                <img src={spot[0]?.spotImages[0]?.url}></img>
                <div>
                    <h3>{spot[0]?.name}</h3>
                    <p>{start} - {end}</p>
                </div>
            </div>
        </div>
    )
}

export default BookingItem;