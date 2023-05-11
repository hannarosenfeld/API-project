import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpotsByCurrentUser } from "../../store/spots"
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import OpenModalButton from "../OpenModalButton";
import DeleteSpotModal from "../DeleteSpotModal";


export default function ManageSpots() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots)

    const spotArr = Object.values(spots)

    useEffect(() => {
        dispatch(getAllSpotsByCurrentUser(user.id))
      },[user.id])

    return (
        <div style={{minWidth: "1000px"}}>
            <h2>Manage your Spots</h2>
            <button>Create A New Spot</button>
            <div style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.5em",
        }}>
            {spotArr.map(spot => (
                <div key={spot.id}
                title={spot.name}
                style={{marginBottom: "2em"}}
                >
                <Link to={`/spots/${spot.id}`}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "1em"
                    }}>
                        <div style={{
                            width: "15em",
                            height: "15em",
                            cursor: "pointer",
                            borderRadius: "3%",
                            marginBottom: "0.6em"
                        }}>
                            <img
                                src={spot.previewImage}
                                style={{
                                    objectFit: "contain",
                                    verticalAlign: "middle",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "3%"
                                }}
                            />
                        </div>
                        <span style={{display: "flex", justifyContent: "space-between"}}>{spot.city}, {spot.state} <span><i class="fa-solid fa-star"></i> {spot.avgRating ? spot.avgRating.toFixed(2) : ' New'}</span></span>
                        <span>{spot.price}</span>
                    </div>
                </Link>
                <div style={{display: "flex", gap: "1em"}}>
                    <Link to={`/spots/${spot.id}/edit`} style={{padding: "0.5em"}}>Update</Link>
                    <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteSpotModal spotId={spot.id}/>}
                    />

                </div>
                </div>
            ))}
        </div>
        </div>
    )
}
