import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpotsByCurrentUser } from "../../store/spots"

export default function ManageSpots() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const spots = useSelector(state => state.spots)

    const spotArr = Object.values(spots)

    console.log("spots: ",spotArr)

    useEffect(() => {
        dispatch(getAllSpotsByCurrentUser(user.id))
      },[user.id])

    return (
        <div style={{minWidth: "60em"}}>
            <h2>Manage your Spots</h2>
            <button>Create A New Spot</button>
            <div>
                
            </div>
        </div>
    )
}
