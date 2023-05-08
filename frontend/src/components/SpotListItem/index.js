
export default function SpotListItem({ spots }) {

    return(
        <div>
            hi
            {spots.map(spot => (
                <div key={spot.id}>
                <h3>{spot.name}</h3>
                </div>
            ))}
        </div>
    )
}
