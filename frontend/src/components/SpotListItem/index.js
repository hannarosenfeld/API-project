import { Link } from "react-router-dom"

export default function SpotListItem({ spots }) {
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
                        flexDirection: "column"
                    }}>
                        <div style={{
                            width: "20em",
                            height: "20em",
                            cursor: "pointer",
                            borderRadius: "3%"

                        }}>
                            <img
                                // src={spot.spotImages[0].url}
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
                        <span>{spot.name}</span>
                        <span>{spot.city}, {spot.state}</span>
                        <span>{spot.price}</span>
                    </div>
                </Link>
                </div>
            ))}
        </div>
    )
}
