import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { editReviewThunk } from '../../store/reviews';

export default function ReviewModal({ reviewToEdit, reviewId, user, spot }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState(reviewToEdit.review);
    const [rating, setRating] = useState(1);
    const [activeRating, setActiveRating] = useState(rating);
    const [errors, setErrors] = useState({});

    console.log()

    useEffect(() => {
      setActiveRating(rating);
    }, [rating]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            review,
            stars: activeRating
        }

        setErrors({});

        return await dispatch(editReviewThunk(payload, reviewId, spot.id))
          .then(closeModal())
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
              setErrors(data.errors);
              console.log(errors)
            }
          });
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
                    minlength="10"
                >{review}</textarea>
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
            <button
                style={{padding: "0.5em", height: "2em", margin: "1em"}}
                disabled={review.length < 10 ? true : false}
            >Submit your Review</button>
            </form>
        </div>
    )
}
