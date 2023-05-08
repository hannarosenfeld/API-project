import { useDispatch, useSelector } from "react-redux";
import SpotListItem from "../SpotListItem"
import spotsReducer from "../../store/spots";

export default function SpotList() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots)

    const spots = Object.values(spotsObj)


    return (
        <>
        <SpotListItem spots={spots} />
        </>
    )
}
