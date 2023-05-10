import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

import "./ReviewModal.css"


function Stars() {
    const [starOneRating, setStarOneRating] = useState(false)
    const [starTwoRating, setStarTwoRating] = useState(false)
    const [starThreeRating, setStarThreeRating] = useState(false)
    const [starFourRating, setStarFourRating] = useState(false)
    const [starFiveRating, setStarFiveRating] = useState(false)

    const starOne = <i class="fa-solid fa-star" onClick={()=> setStarOneRating(!starOneRating)}></i>
    const starTwo = <i class="fa-solid fa-star" onClick={()=> setStarTwoRating(true)}></i>
    const starThree = <i class="fa-solid fa-star" onClick={()=> setStarThreeRating(true)}></i>
    const starFour = <i class="fa-solid fa-star" onClick={()=> setStarFourRating(true)}></i>
    const starFive = <i class="fa-solid fa-star" onClick={()=> setStarFiveRating(true)}></i>

    const stars = [starOne, starTwo, starThree, starFour, starFive]

    if (starOneRating === true) {
        console.log(starOne)
        starOne.className += "checked"
    }

    return stars
}


export default function ReviewModal( ) {
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
            {/* <Stars/> */}
            </div>
            <button style={{padding: "0.5em", height: "2em", margin: "1em"}}>Submit your Review</button>
            </form>
        </div>
    )
}
