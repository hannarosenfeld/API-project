import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getReviewsByUser } from "../../store/reviews";
import { getOneSpot } from "../../store/spots";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";

export default function ManageReviews() {
    const dispatch = useDispatch();
    const reviewsObj = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)
    const reviews = Object.values(reviewsObj)

    console.log(reviews)

    useEffect(() => {
        dispatch(getReviewsByUser(user.id))
    }, [dispatch, user.id])
    return (
        <div>
            <div style={{margin: "2em 0",display: "flex", flexDirection: "column",gap: "2em"}}>
                {reviews.map(review => (
                    <div key={review.id}>
                        <div>{review.createdAt.slice(5,7)} {review.createdAt.slice(0,4)}</div>
                        <div>{review.review}</div>
                        <div className="manage-spots-buttons" style={{display: "flex", marginTop: "0.5em"}}>
                            {/* <Link to={`/spots/${spot.id}/edit`} style={{padding: "0.5em"}}>Update</Link> */}
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<DeleteReviewModal reviewId={review.id}/>}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
