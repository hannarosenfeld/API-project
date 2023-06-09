import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteReview } from "../../store/reviews";

function DeleteReviewModal({ reviewId, spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  function handleDelete(){
    closeModal()
    dispatch(deleteReview(reviewId, spotId))
  }

  return (
    <div style={{display: "flex", flexDirection: "column", gap:"1em", alignItems: "center", padding: "2em"}}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this review?</p>
        <button
            style={{width: "80%", height: "2em", backgroundColor: "darkred", color: "var(--white)"}}
            onClick={() => handleDelete()}
        >
            Yes (Delete Review)
        </button>
        <button
            style={{width: "80%", height: "2em", backgroundColor: "darkgray"}}
            onClick={() => closeModal()}
        >
            No (Keep Review)
        </button>
    </div>
  );
}

export default DeleteReviewModal;
