import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteSpot } from "../../store/spots";

function DeleteSpotModal({ spotId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  function handleDelete() {
    dispatch(deleteSpot(spotId))
    closeModal()
  }

  return (
    <div style={{display: "flex", flexDirection: "column", gap:"1em", alignItems: "center", padding: "2em"}}>
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot from the listings?</p>
        <button
            style={{width: "80%", height: "2em", backgroundColor: "darkred"}}
            onClick={() => handleDelete()}
        >
            Yes (Delete Spot)
        </button>
        <button
            style={{width: "80%", height: "2em"}}
            onClick={() => closeModal()}
        >
            No (Keep Spot)
        </button>
    </div>
  );
}

export default DeleteSpotModal;
