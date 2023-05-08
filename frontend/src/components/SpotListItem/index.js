import { Link } from "react-router-dom"

const images = [
    "https://a0.muscache.com/im/pictures/9b1dac05-b810-46ea-8d35-f57072af1fe1.jpg",
    "https://a0.muscache.com/im/pictures/miso/Hosting-39441496/original/8cf45f0a-7fa3-4fca-b530-6f959e03ae3d.jpeg",
    "https://a0.muscache.com/im/pictures/miso/Hosting-51401668/original/bb244db7-d56a-40f3-b5f1-9940565cbff7.jpeg",
    "https://a0.muscache.com/im/pictures/miso/Hosting-36935661/original/b3e3bb0b-4727-460a-9d60-9a79f65a9f35.jpeg",
    "https://a0.muscache.com/im/pictures/9b1dac05-b810-46ea-8d35-f57072af1fe1.jpg"
]

export default function SpotListItem({ spots }) {
    return(
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap"
        }}>
            {spots.map(spot => (
                <div key={spot.id} style={{display: "flex", flexDirection: "column"}}>
                <Link to={`/spots/${spot.id}`}>
                    <div style={{
                        border: "2px solid red",
                        width: "20em",
                        height: "20em",
                        cursor: "pointer"
                    }}>
                        <img
                            src={images[spot.id]}
                            style={{
                                objectFit: "contain",
                                verticalAlign: "middle",
                                objectFit: "cover",
                                width: "100%",
                                height: "100%"
                            }}
                        />
                    </div>
                </Link>
                <span>{spot.name}</span>
                <span>{spot.city}, {spot.state}</span>
                <span>{spot.price}</span>
                </div>
            ))}
        </div>
    )
}
