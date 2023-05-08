import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getOneSpot } from "../../store/spots";

export default function SpotDetail() {
    const dispatch = useDispatch();
    let spotId = useParams();
    const spotsObj = useSelector(state => state.spots)
    const spot = Object.values(spotsObj)

    spotId = parseInt(spotId.spotId)

    console.log("spot!", spot)

    useEffect(() => {
        dispatch(getOneSpot(parseInt(spotId)))
      },[])

    return (
        <h2>
            {spot[0].name}
        </h2>
    )
}
