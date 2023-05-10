import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "./ReviewModal.css"
import { useEffect, useState } from 'react';



export default function ReviewModal() {
    const { closeModal } = useModal();
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const [activeRating, setActiveRating] = useState(rating);

    useEffect(() => {
      setActiveRating(rating);
    }, [rating]);

    return (
        <div className="review-form-wrapper">
            <h2>How was your stay?</h2>
            <form style={{display: "flex", flexDirection: "column", justifyContent: "center", margin: "0 auto"}}>
                <textarea
                    required
                    style={{height: "17em", background: "aliceblue", marginBottom: "2em"}}
                />
            <div className="stars" style={{margin: "0 auto"}}>
            {/* <Stars/> */}
            </div>
            <button style={{padding: "0.5em", height: "2em", margin: "1em"}}>Submit your Review</button>
            </form>
        </div>
    )
}
