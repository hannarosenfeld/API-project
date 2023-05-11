import "./ReviewModal.css"
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReview } from "../../store/spots";

export default function ReviewModal({ spotId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const [activeRating, setActiveRating] = useState(rating);

    useEffect(() => {
      setActiveRating(rating);
    }, [rating]);

    console.log()
    const handleSubmit = async (e) => {
        e.preventDefault();
        //TODO: add rating to spot
        const payload = {
            review,
            rating
        }
       console.log("###### payload ",payload, "spotId: ", spotId)
       await dispatch(createReview(spotId, payload))
       closeModal()
    }
    return (
        <div className="review-form-wrapper">
            <h2>How was your stay?</h2>
            <form
            onSubmit={handleSubmit}
            style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: "0 auto"}}>
                <textarea
                    required
                    style={{height: "17em", background: "aliceblue", marginBottom: "2em"}}
                    onChange={(e) => setReview(e.target.value)}
                />
            <div className="stars" style={{margin: "0 auto"}}>
                <div className="rating-input" style={{display: "flex"}}>
                    <div
                        className={activeRating >= 1 ? "filled" : "empty"}
                        onMouseEnter={() => { setActiveRating(1)} }
                        onMouseLeave={() => { setActiveRating(rating)} }
                        onClick={() => { setRating(1)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div
                        className={activeRating >= 2 ? "filled" : "empty"}
                        onMouseEnter={() => { setActiveRating(2)} }
                        onMouseLeave={() => { setActiveRating(rating)} }
                        onClick={() => { setRating(2)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div
                        className={activeRating >= 3 ? "filled" : "empty"}
                        onMouseEnter={() => { setActiveRating(3)} }
                        onMouseLeave={() => { setActiveRating(rating)} }
                        onClick={() => { setRating(3)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div
                        className={activeRating >= 4 ? "filled" : "empty"}
                        onMouseEnter={() => { setActiveRating(4)} }
                        onMouseLeave={() => { setActiveRating(rating)} }
                        onClick={() => { setRating(4)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    <div
                        className={activeRating >= 5 ? "filled" : "empty"}
                        onMouseEnter={() => { setActiveRating(5) }}
                        onMouseLeave={() => { setActiveRating(rating)} }
                        onClick={() => { setRating(5)} }
                    >
                        <i className="fa fa-star"></i>
                    </div>
                    </div>
            </div>
            <button style={{padding: "0.5em", height: "2em", margin: "1em"}}>Submit your Review</button>
            </form>
        </div>
    )
}
