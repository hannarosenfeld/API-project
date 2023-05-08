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
    }, [dispatch,spotId])

    if (!spot) {
        return(
            <>
            spot does not exist
            </>
        )
    }

    console.log("spot!", spot)

    return (
        <h2>
            {spot.name}
        </h2>
    )
}
