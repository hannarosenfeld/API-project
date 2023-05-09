import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";

import "./SpotDetail.css"

export default function SpotDetail() {
    const dispatch = useDispatch();
    let { spotId } = useParams();
    spotId = parseInt(spotId)
    const spot = useSelector(state => state.spots[spotId])

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])

    if (!spot || !spot.Owner || !spot.spotImages) {
        return(
            <>
            </>
        )
    }

    console.log(spot)

    return (
        <div className="spot-detail-wrapper">
            <h2>{spot.name}</h2>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
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
                    justifyContent: "space-between"
                }}>
                <div style={{width: "75%"}}>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
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
                        <span> star #.# . # reviews</span>
                    </div>
                    <button style={{
                        width: "100%",
                        height: "3em",
                        borderRadius: "1em",
                        backgroundColor: "var(--airbnb)",
                        color: "var(--white)"
                        }}>Reserve</button>
                </div>
            </div>
        </div>
    )
}
