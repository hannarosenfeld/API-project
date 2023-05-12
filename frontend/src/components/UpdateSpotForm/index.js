import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editSpot, getOneSpot } from '../../store/spots';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { createSpotImage } from '../../store/spots';


export default function UpdateSpotForm() {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()
    const spot = useSelector(state => state.spots[spotId])

    useEffect(() => {
        dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])

    const [title, setTitle] = useState(spot.name)
    const [country, setCountry] = useState(spot.country)
    const [street, setStreet] = useState(spot.address)
    const [city, setCity] = useState(spot.city)
    const [state, setState] = useState(spot.state)
    const [description, setDescription] = useState(spot.description)
    const [price, setPrice] = useState(spot.price)
    const [previewImage, setPreviewImage] = useState(spot.previewImage)
    const [photoOne, setPhotoOne] = useState(spot.photoOne)
    const [photoTwo, setPhotoTwo] = useState(spot.photoTwo)
    const [photoThree, setPhotoThree] = useState(spot.photoThree)
    const [photoFour, setPhotoFour] = useState(spot.photoFour)
    const [errors, setErrors] = useState({})

    const updateTitle = (e) => setTitle(e.target.value);
    const updateCountry= (e) => setCountry(e.target.value);
    const updateStreet = (e) => setStreet(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: title,
            country,
            address: street,
            city,
            state,
            description,
            price,
            previewImage,
            avgStarRating: 0,
            lat: 5,
            lng: 5
        }

        const newSpotImages = {
            url: previewImage,
            preview: true
        }

        const images = [
            newSpotImages,
            { url: photoOne, preview: false },
            { url: photoTwo, preview: false },
            { url: photoThree, preview: false },
            { url: photoFour, preview: false }
        ]

        let updatedSpot = payload;

        const response = await dispatch(editSpot(updatedSpot, spotId))

        if (!response.errors) {
            await dispatch(createSpotImage(response.id, images))
            history.push(`/spots/${response.id}`);
        } else {
            setErrors(response.errors)
        }
    }

    return (
        <div className="new-spot-form-wrapper">
            <div className="new-spot-form-inner-container">
                <h2>Update your Spot</h2>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation</p>
                <form onSubmit={handleSubmit}>
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "0.8em"
                        }}
                    >
                        <span>Country <span>{errors.country ? errors.country : ""}</span></span>
                        <input
                            type="text"
                            placeholder="Country"
                            value={country}
                            onChange={updateCountry}
                            required
                        ></input>
                    </label>
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "0.8em"
                        }}
                    >
                        Street Address
                        <input
                            type="text"
                            placeholder="Street Address"
                            value={street}
                            onChange={updateStreet}
                            required
                        ></input>
                    </label>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "55%"
                        }}
                    >
                        City
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={updateCity}
                            required
                        ></input>
                    </label>
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "35%"
                        }}
                    >
                        State
                        <input
                            type="text"
                            placeholder="STATE"
                            value={state}
                            onChange={updateState}
                            required
                        ></input>
                    </label>
                    </div>
                    <div style={{
                        borderTop: "1px solid grey",
                        marginTop: "2em"
                        }}>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amentities like
fast wif or parking, and what you love about the neighborhood.</p>
                        <textarea
                            placeholder="Please write at least 30 characters"
                            value={description}
                            onChange={updateDescription}
                            minlength="30"
                            required
                        >
                        </textarea>
                    </div>
                    <div style={{
                        borderTop: "1px solid grey",
                        marginTop: "2em"
                        }}>
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests' attention with a spot title that highlights what makes
your place special.</p>
                        <input
                            type="text"
                            placeholder="Name of your spot"
                            value={title}
                            onChange={updateTitle}
                            required
                        ></input>
                    </div>
                    <div style={{
                        borderTop: "1px solid grey",
                        marginTop: "2em"
                        }}>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher
in search results.</p>
                        <span style={{display: "flex", alignItems: "center", gap: "0.5em"}}>
                        $
                        <input
                        type="number"
                        placeholder="Price per night (USD)"
                        value={price}
                        onChange={updatePrice}
                        required
                        ></input></span>
                    </div>
                    <div style={{
                        borderTop: "1px solid grey",
                        borderBottom: "1px solid grey",
                        marginTop: "2em"
                        }}>
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <div
                        style={{display: "flex", flexDirection: "column", gap: "0.5em", marginBottom: "2em"}}>
                            <input
                                type="text"
                                placeholder="Preview Image URL"
                                value={previewImage}
                                onChange={updatePreviewImage}
                                accept="image/png, image/jpg, image/jpeg"
                                required
                            ></input>
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={photoOne}
                                onChange={(e) => setPhotoOne(e.target.value)}
                                accept="image/png, image/jpg, image/jpeg"
                            ></input>
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={photoTwo}
                                onChange={(e) => setPhotoTwo(e.target.value)}
                                accept="image/png, image/jpg, image/jpeg"
                            ></input>
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={photoThree}
                                onChange={(e) => setPhotoThree(e.target.value)}
                                accept="image/png, image/jpg, image/jpeg"
                            ></input>
                            <input
                                type="text"
                                placeholder="Image URL"
                                value={photoFour}
                                onChange={(e) => setPhotoFour(e.target.value)}
                                accept="image/png, image/jpg, image/jpeg"
                            ></input>
                        </div>
                    </div>
                    <div style={{
                        marginTop: "1em",
                        marginBottom: "2em",
                        display: "flex",
                        margin: "0 auto"
                        }}>
                            <button style={{
                                background: "var(--airbnb)",
                                color: "var(--white)",
                                height: "2em",
                                width: "12em",
                                margin: "1em 0"
                                }}>Update Spot</button>
                        </div>
                </form>
            </div>
        </div>
    )
}
