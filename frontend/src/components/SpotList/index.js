import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotListItem from "../SpotListItem"
import { getAllSpots } from "../../store/spots.js"


export default function SpotList() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots)

    const spots = Object.values(spotsObj)

    useEffect(() => {
        dispatch(getAllSpots(spots))
      },[])

    return (
        <>
        <SpotListItem spots={spots} />
        </>
    )
}
