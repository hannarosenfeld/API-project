import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";
import ReviewModal from "../ReviewModal";
import OpenModalButton from "../OpenModalButton";
import { getReviews,  deleteReview } from "../../store/reviews";
import "./SpotDetail.css"
import { getOneUser } from "../../store/user";


export default function SpotDetail() {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = parseInt(spotId)
    const spot = useSelector(state => state.spots[spotId])
    const user = useSelector(state => state.session.user)
    const reviewsObj =  useSelector(state => state.reviews)

    const reviews = Object.values(reviewsObj)

    useEffect(() => {
        dispatch(getOneSpot(spotId))
        dispatch(getReviews(spotId))
    }, [dispatch, spotId])

    console.log("reviews: ", reviewsObj)

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
                    <div>{spot.spotImages[1].url != undefined ? <img src={spot.spotImages[1].url}/> : ""}</div>
                    <div>{spot.spotImages[2].url != undefined ? <img src={spot.spotImages[2].url}/> : ""}</div>
                    <div>{spot.spotImages[3].url != undefined ? <img src={spot.spotImages[3].url}/> : ""}</div>
                    <div>{spot.spotImages[4].url != undefined ? <img src={spot.spotImages[4].url}/> : ""}</div>
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
                 <div style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "2px solid black",
                    width: "30%",
                    borderRadius: "1em",
                    alignSelf: "center",
                    padding: "1em"
                    }}>

                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                        }}>
                        <h2>${spot.price} night</h2>
                        <span><i class="fa-solid fa-star"></i>{spot.avgStarRating ? `  ${spot.avgStarRating.toFixed(2)} · ` : ''} {!spot.numReviews ? 'New' : ` ${spot.numReviews} ${spot.numReviews === 1 ? "review" : "reviews"}`}</span>
                    </div>
                    <button
                    style={{
                        width: "100%",
                        height: "3em",
                        borderRadius: "1em",
                        backgroundColor: "var(--airbnb)",
                        color: "var(--white)"
                    }}
                    onClick={() => alert("Feature coming soon!")}
                        >Reserve</button>
                </div>
            </div>
            <div className="spot-reviews-section" style={{display: "flex", flexDirection: "column"}}>
                <h4>
                    <i className="fa-solid fa-star"></i>
                    {spot.avgStarRating ? `  ${spot.avgStarRating.toFixed(2)} · ` : ''} {!spot.numReviews ? 'New' : ` ${spot.numReviews} reviews`}
                </h4>
                {user?.id !== spot.ownerId ? <OpenModalButton buttonText="Post Your Review" modalComponent={ <ReviewModal spotId={spotId} /> }/> : ''}
            <div className="spot-reviews-container" style={{margin: "2em 0",display: "flex", flexDirection: "column-reverse",gap: "3em"}}>
                        {reviews.map(review => (
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <div>{review.User.username}</div>
                                <div>{review.createdAt.slice(5,7)} {review.createdAt.slice(0,4)}</div>
                                <div>{review.review}</div>
                                {user?.id === review.User.id ? <button style={{width: "5em", height: "2em"}} onClick={() => dispatch(deleteReview(review.id))}>Delete</button> : ""}
                            </div>
                        ))}
            </div>
            </div>
        </div>
    )
}
