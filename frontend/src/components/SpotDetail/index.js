import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";


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

    return (
        <div style={{padding: "0 2.5%"}}>
            <h2>{spot.name}</h2>
            <h3>{spot.city}, {spot.state}, {spot.country}</h3>
            <div className="spotImages">
                {spot.spotImages.map(image => (
                    <img src={image.url} />
                ))}
            </div>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div style={{width: "75%", border: "2px solid pink"}}>
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                 <div style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "2px solid black",
                    width: "20%",
                    borderRadius: "1em",
                    alignSelf: "center",
                    padding: "1em"
                    }}>

                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
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
