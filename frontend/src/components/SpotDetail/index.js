import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { getOneSpot } from "../../store/spots";
import { getReviews } from "../../store/reviews";
import { createBooking } from "../../store/bookings";

import DeleteReviewModal from "../DeleteReviewModal";
import UpdateReviewModal from "../UpdateReviewModal";
import ReviewModal from "../ReviewModal";
import OpenModalButton from "../OpenModalButton";

import "./SpotDetail.css"


export default function SpotDetail() {
    const history = useHistory();
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = parseInt(spotId)
    const spot = useSelector(state => state.spots[spotId])
    const user = useSelector(state => state.session.user)

    const reviewsObj =  useSelector(state => state.reviews)
    const reviews = Object.values(reviewsObj)
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const currentDate = new Date();
    const [currYear, setCurrYear] = useState(currentDate.getFullYear());
    const [currMonth, setCurrMonth] = useState(currentDate.getMonth());
    const [leftDays, setLeftDays] = useState([]);
    const [rightDays, setRightDays] = useState([]);
    const [checkinDate, setCheckinDate] = useState(null);
    const [checkoutDate, setCheckoutDate] = useState(null);

    const handleReserve = async () => {
        if (!user) {
            alert("You must be logged in to book this spot!")
            return
        }
        if (!checkinDate || !checkoutDate) {
          alert("Please select check-in and checkout dates");
          return;
        }
    
        try {
          const booking = await dispatch(
            createBooking(spotId, checkinDate, checkoutDate, user.id)
          );

          history.push("/bookings/current")

          // Handle successful booking creation here (e.g. show success message)
          console.log("Booking created:", booking);
    
          // Close the booking modal
          setIsBookingModalOpen(false);
        } catch (error) {
          // Handle error cases here (e.g. show error message)
          console.error("Error creating booking:", error.message);
        }
      };

    const renderMonthDays = (year, month) => {
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
        
        const daysArray = [];
        
        for (let i = 1; i <= lastDateOfMonth; i++) {
            const dayDate = new Date(year, month, i);
            const isToday = dayDate.toDateString() === currentDate.toDateString();
            const isActive = dayDate >= currentDate || dayDate.toDateString() === currentDate.toDateString();
            const isBetween = checkinDate && checkoutDate && dayDate > checkinDate && dayDate < checkoutDate;
        
            daysArray.push({
                day: i,
                inactive: !isActive,
                istoday: isToday,
                isCheckin: checkinDate && checkinDate.toDateString() === dayDate.toDateString(),
                isCheckout: checkoutDate && checkoutDate.toDateString() === dayDate.toDateString(),
                isStayDay: isBetween,
            });
        }
        
        return daysArray;
    };
    

    useEffect(() => {
        setLeftDays(renderMonthDays(currYear, currMonth));

        const nextMonth = (currMonth + 1) % 12;
        const nextYear = nextMonth === 0 ? currYear + 1 : currYear;
        setRightDays(renderMonthDays(nextYear, nextMonth));
    }, [currYear, currMonth, checkinDate, checkoutDate]);

    const leftCurrentDate = `${months[currMonth]} ${currYear}`;
    const rightCurrentDate = `${months[(currMonth + 1) % 12]} ${currMonth + 1 > 11 ? currYear + 1 : currYear}`;

    const handleClick = (iconId) => {
        if (iconId === "prev") {
            const newMonth = currMonth === 0 ? 11 : currMonth - 1;
            const newYear = currMonth === 0 ? currYear - 1 : currYear;
            setCurrMonth(newMonth);
            setCurrYear(newYear);
        } else if (iconId === "next") {
            const newMonth = (currMonth + 1) % 12;
            const newYear = newMonth === 0 ? currYear + 1 : currYear;
            setCurrMonth(newMonth);
            setCurrYear(newYear);
        }
    };

    const handleDayClick = (day, month, year) => {
        const selectedDate = new Date(year, month, day);

        if (!checkinDate || (checkoutDate && selectedDate <= checkinDate)) {
            setCheckinDate(selectedDate);
            setCheckoutDate(null);
        } else if (!checkoutDate || selectedDate >= checkinDate) {
            setCheckoutDate(selectedDate);
        }
    };


    const toggleBookingModal = () => {
        setIsBookingModalOpen(!isBookingModalOpen);
    };
    
    useEffect(() => {
        dispatch(getOneSpot(spotId))
        dispatch(getReviews(spotId))
    }, [])

    if (!spot || !spot.Owner || !spot.spotImages) {
        return(
            <>
            </>
        )
    }

    return (
        <div className="spot-detail-wrapper">
            <h2>{spot.name}</h2>
            <h4>{spot.city}, {spot.state}, {spot.country}</h4>
            <div className="spot-images"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <div style={{
                    width: "40em",
                    height: "27em",
                }}>
                    <img
                    src={spot.spotImages[0].url}
                    style={{
                        objectFit: "contain",
                        verticalAlign: "middle",
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                    }}
                    />
                </div>
                <div className="four-squares">
                    <div>{spot.spotImages[1].url !== undefined ? <img src={spot.spotImages[1].url}/> : ""}</div>
                    <div>{spot.spotImages[2].url !== undefined ? <img src={spot.spotImages[2].url}/> : ""}</div>
                    <div>{spot.spotImages[3].url !== undefined ? <img src={spot.spotImages[3].url}/> : ""}</div>
                    <div>{spot.spotImages[4].url !== undefined ? <img src={spot.spotImages[4].url}/> : ""}</div>
                </div>
            </div>
            <div
                className="spot-details"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderBottom: "1px solid grey",
                    paddingBottom: "2em"
                }}>
                <div style={{width: "70%"}}>
                    <h3>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h3>
                    <p  style={{width: "90%"}}>{spot.description}</p>
                </div>
                 <div className="spot-info">

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                        }}>
                        <h2>${spot.price} night</h2>
                        <span><i class="fa-solid fa-star"></i>{spot.avgStarRating ? `  ${spot.avgStarRating.toFixed(2)} · ` : ''} {!spot.numReviews ? 'New' : ` ${spot.numReviews} ${spot.numReviews === 1 ? "review" : "reviews"}`}</span>
                    </div>

                    {/* Booking Section */}
                    <div className="booking-section" onClick={toggleBookingModal}>
                    <div className="check-in">
                      <div style={{ fontSize: "10px", fontWeight: "bold" }}>CHECK-IN</div>
                      <div>{checkinDate ? checkinDate.toLocaleDateString("en-US") : "Select date"}</div>
                    </div>
                    <div className="checkout">
                      <div style={{ fontSize: "10px", fontWeight: "bold" }}>CHECKOUT</div>
                      <div>{checkoutDate ? checkoutDate.toLocaleDateString("en-US") : "Select date"}</div>
                    </div>
                    </div>

                    {isBookingModalOpen && (
                              <div className="booking-modal">
                              <div className="booking-modal-content">
                                  <div className="booking-section">
                                      <div className="check-in">
                                        <div style={{ fontSize: "10px", fontWeight: "bold" }}>CHECK-IN</div>
                                        <div>{checkinDate ? checkinDate.toLocaleDateString("en-US") : "Select date"}</div>
                                      </div>
                                      <div className="checkout">
                                        <div style={{ fontSize: "10px", fontWeight: "bold" }}>CHECKOUT</div>
                                        <div>{checkoutDate ? checkoutDate.toLocaleDateString("en-US") : "Select date"}</div>
                                      </div>
                                  </div>
                                  {/* Calendar  Start*/}
                                  <div className="cal-body">
                                      <div className="wrapper">
                                          <header>
                                              <div className="icons">
                                                  {currYear === currentDate.getFullYear() && currMonth === currentDate.getMonth() ? (
                                                      <i className="fa-solid fa-chevron-left inactive"></i>
                                                  ) : (
                                                      <i onClick={() => handleClick("prev")} className="fa-solid fa-chevron-left"></i>
                                                  )}
                                              </div>
                                              <p className="current-date">{leftCurrentDate}</p>
                                          </header>
                                          <div className="calendar">
                                              <ul className="weeks">
                                                  <li>Sun</li>
                                                  <li>Mon</li>
                                                  <li>Tue</li>
                                                  <li>Wed</li>
                                                  <li>Thu</li>
                                                  <li>Fri</li>
                                                  <li>Sat</li>
                                              </ul>
                                              <ul className="days">
                                                  {leftDays.map((dayObj) => (
                                                      <li
                                                          key={dayObj.day}
                                                          className={`${dayObj.inactive ? "inactive" : ""} ${dayObj.isCheckin ? "checkin" : ""} ${dayObj.isCheckout ? "checkout-date" : ""} ${dayObj.isStayDay ? "stay-days" : ""}`}
                                                          onClick={() => handleDayClick(dayObj.day, currMonth, currYear)}
                                                      >
                                                          {dayObj.day}
                                                      </li>
                                                  ))}
                                              </ul>
                                          </div>
                                      </div>
                  
                                      <div className="wrapper">
                                          <header>
                                              <p className="current-date">{rightCurrentDate}</p>
                                              <div className="icons">
                                                  <i onClick={() => handleClick("next")} className="fa-solid fa-chevron-right"></i>
                                              </div>
                                          </header>
                                          <div className="calendar">
                                              <ul className="weeks">
                                                  <li>Sun</li>
                                                  <li>Mon</li>
                                                  <li>Tue</li>
                                                  <li>Wed</li>
                                                  <li>Thu</li>
                                                  <li>Fri</li>
                                                  <li>Sat</li>
                                              </ul>
                                              <ul className="days">
                                                  {rightDays.map((dayObj) => (
                                                      <li
                                                          key={dayObj.day}
                                                          className={`${dayObj.inactive ? "inactive" : ""} ${dayObj.isCheckin ? "checkin" : ""} ${dayObj.isCheckout ? "checkout-date" : ""} ${dayObj.isStayDay ? "stay-days" : ""}`}
                                                          onClick={() => handleDayClick(dayObj.day, (currMonth + 1) % 12, currMonth + 1 > 11 ? currYear + 1 : currYear)}
                                                      >
                                                          {dayObj.day}
                                                      </li>
                                                  ))}
                                              </ul>
                                          </div>
                                      </div>
                              </div>
                          {/* Calendar End */}
                                  <div style={{width: "100%", marginTop: "30px"}}>
                                      <button onClick={toggleBookingModal}>Close</button>
                                  </div>
                              </div>
                          </div>
                    )}

                    <button
                    style={{
                        width: "100%",
                        height: "3em",
                        borderRadius: "8px",
                        backgroundColor: "var(--airbnb)",
                        color: "var(--white)"
                    }}
                    onClick={handleReserve}
                        >Reserve</button>
                </div>
            </div>
            <div className="spot-reviews-section" style={{display: "flex", flexDirection: "column"}}>
                <h4>
                    <i className="fa-solid fa-star"></i>
                    {spot.avgStarRating ? `  ${spot.avgStarRating.toFixed(2)} · ` : ''} {!spot.numReviews ? 'New' : ` ${spot.numReviews} ${spot.numReviews === 1 ? "review" : "reviews"}`}
                </h4>
                {user && user?.id !== spot.ownerId && reviews.find(review => review.User?.id === user?.id ) === undefined ? <OpenModalButton buttonText="Post Your Review" modalComponent={ <ReviewModal spotId={spotId} /> }/> : ''}

            <div className="spot-reviews-container" style={{margin: "2em 0",display: "flex", flexDirection: "column-reverse",gap: "3em"}}>
            {user && user?.id !== spot.ownerId && !reviews.length ? "Be the first to post a review!" : ''}
            {reviews.map((review) => (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>{review?.User?.username}</div>
              <div>
                {review?.createdAt?.slice(5, 7)} {review.createdAt.slice(0, 4)}
              </div>
              <div>{review?.review}</div>
              <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                <div>
                  {user?.id === review?.User?.id ? (
                    <OpenModalButton
                      style={{ width: "5em", height: "2em" }}
                      buttonText="Delete"
                      modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spotId} />}
                    >
                      Delete
                    </OpenModalButton>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {user?.id === review?.User?.id ? (
                    <OpenModalButton
                      style={{ width: "5em", height: "2em" }}
                      buttonText="Update"
                      modalComponent={
                        <UpdateReviewModal reviewToEdit={review} reviewId={review.id} user={user} spot={spot} />
                      }
                    >
                      Update
                    </OpenModalButton>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          ))}
          </div>
          </div>
        </div>
    )
}
