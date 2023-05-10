import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "./ReviewModal.css"
import { useEffect, useState } from 'react';

const Stars = ({ rating, disabled, onChange }) => {
  const [activeRating, setActiveRating] = useState(rating);

  useEffect(() => {
    setActiveRating(rating);
  }, [rating]);

  return (
    <div className="rating-input" style={{display: "flex"}}>
      <div
        className={activeRating >= 1 ? "filled" : "empty"}
        onMouseEnter={() => { if (!disabled) setActiveRating(1)} }
        onMouseLeave={() => { if (!disabled) setActiveRating(rating)} }
        onClick={() => { if (!disabled) onChange(1)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={activeRating >= 2 ? "filled" : "empty"}
        onMouseEnter={() => { if (!disabled) setActiveRating(2)} }
        onMouseLeave={() => { if (!disabled) setActiveRating(rating)} }
        onClick={() => { if (!disabled) onChange(2)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={activeRating >= 3 ? "filled" : "empty"}
        onMouseEnter={() => { if (!disabled) setActiveRating(3)} }
        onMouseLeave={() => { if (!disabled) setActiveRating(rating)} }
        onClick={() => { if (!disabled) onChange(3)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={activeRating >= 4 ? "filled" : "empty"}
        onMouseEnter={() => { if (!disabled) setActiveRating(4)} }
        onMouseLeave={() => { if (!disabled) setActiveRating(rating)} }
        onClick={() => { if (!disabled) onChange(4)} }
      >
        <i className="fa fa-star"></i>
      </div>
      <div
        className={activeRating >= 5 ? "filled" : "empty"}
        onMouseEnter={() => { if (!disabled) setActiveRating(5) }}
        onMouseLeave={() => { if (!disabled) setActiveRating(rating)} }
        onClick={() => { if (!disabled) onChange(5)} }
      >
        <i className="fa fa-star"></i>
      </div>
    </div>
  );
};


export default function ReviewModal() {
    const { closeModal } = useModal();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);

    return (
        <div className="review-form-wrapper">
            <h2>How was your stay?</h2>
            <form style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: "0 auto"}}>
                <textarea
                    required
                    style={{height: "17em", background: "aliceblue", marginBottom: "2em"}}
                />
            <div className="stars" style={{margin: "0 auto"}}>
            {/* <Stars
              disabled={false}
              onChange={onChange}
              rating={rating}
            /> */}
            </div>
            <button style={{padding: "0.5em", height: "2em", margin: "1em"}}>Submit your Review</button>
            </form>
        </div>
    )
}
