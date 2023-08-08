import React from "react";
import Calendar from "./Calendar"

export default function BookingModal({ onClose }) {

    return (
        <div className="booking-modal">
            <div className="booking-modal-content">
                <div className="booking-section">
                    <div className="check-in">
                        <div style={{fontSize: "10px", fontWeight: "bold"}}>CHECK-IN</div>
                        <div>9/17/2023</div>
                    </div>
                    <div className="checkout">
                        <div style={{fontSize: "10px", fontWeight: "bold"}}>CHECKOUT</div>
                        <div>9/23/2023</div>
                    </div>
                </div>
                <Calendar />
                <div style={{width: "100%", marginTop: "30px"}}>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}