import { Link } from "react-router-dom"

export default function SpotListItem({ spots }) {
    console.log("spots",spots)
    return(
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap"
        }}>
            {spots.map(spot => (
                <div key={spot.id}
                title={spot.name}
                >
                <Link to={`/spots/${spot.id}`}>
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: "2em"
                    }}>
                        <div style={{
                            width: "20em",
                            height: "20em",
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
                        <span style={{display: "flex", justifyContent: "space-between"}}>
                            {spot.city}, {spot.state} <span><i class="fa-solid fa-star"></i>
                            {spot.avgRating ? ` ${spot.avgRating.toFixed(2)}` : ' New'}
                            </span></span>
                        <span>{spot.price}</span>
                    </div>
                </Link>
                </div>
            ))}
        </div>
    )
}
