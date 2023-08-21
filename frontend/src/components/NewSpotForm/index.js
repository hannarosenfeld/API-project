import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpot, createSpotImage } from '../../store/spots';

import "./NewSpotForm.css"

const isImageValid = (url) => {
    return (
        url.endsWith(".png") ||
        url.endsWith(".jpg") ||
        url.endsWith(".jpeg")
    );
};

const NewSpotForm = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState({
        title: '',
        country: '',
        street: '',
        city: '',
        state: '',
        description: '',
        price: 0,
        previewImage: '',
        photoOne: '',
        photoTwo: '',
        photoThree: '',
        photoFour: '',
    });

    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const updateField = (field, value) => {
        setFormData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    useEffect(() => {
        if (hasSubmitted) {
            const newErrors = {};

            if (!formData.country) {
                newErrors.country = "Country is required";
            }
            if (!formData.street) {
                newErrors.address = "Address is required";
            }
            if (!formData.city) {
                newErrors.city = "City is required";
            }
            if (!formData.state) {
                newErrors.state = "State is required";
            }
            if (formData.description.length < 30) {
                newErrors.description = "Description needs a minimum of 30 characters";
            }
            if (!formData.title) {
                newErrors.name = "Name is required";
            }
            if (!formData.price || formData.price < 1) {
                newErrors.price = "Price is required";
            }
            if (!formData.previewImage) {
                newErrors.previewImageLength = "Preview image is required.";
            }
            if (
                !formData.previewImage.endsWith(".png") &&
                !formData.previewImage.endsWith(".jpg") &&
                !formData.previewImage.endsWith(".jpeg")
            ) {
                newErrors.previewImage = "Image URL must end in .png, .jpg, or .jpeg";
            }

            setErrors(newErrors);
        }
    }, [formData, hasSubmitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        setHasSubmitted(true);
        const newErrors = { ...errors }; // Copy existing errors
    
        if (
            !formData.previewImage ||
            (
                !formData.previewImage.endsWith(".png") &&
                !formData.previewImage.endsWith(".jpg") &&
                !formData.previewImage.endsWith(".jpeg")
            )
        ) {
            newErrors.previewImage = "Preview image URL must end in .png, .jpg, or .jpeg";
        }
    
        if (
            (formData.photoOne && !isImageValid(formData.photoOne)) ||
            (formData.photoTwo && !isImageValid(formData.photoTwo)) ||
            (formData.photoThree && !isImageValid(formData.photoThree)) ||
            (formData.photoFour && !isImageValid(formData.photoFour))
        ) {
            newErrors.images = "Image URLs must end in .png, .jpg, or .jpeg";
        }
    
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return; // Don't proceed if there are errors
        }
    
        // Rest of your handleSubmit logic

    
        const payload = {
            name: formData.title,
            country: formData.country,
            address: formData.street,
            city: formData.city,
            state: formData.state,
            description: formData.description,
            price: formData.price,
            previewImage: formData.previewImage,
            avgStarRating: 1,
            lat: 5,
            lng: 5
        }
    
        // Validation logic here
    
        const response = await dispatch(createSpot(payload));
    
        if (!response.errors) {
            const newSpotImages = {
                url: formData.previewImage,
                preview: true
            }
    
            const images = [
                newSpotImages,
                { url: formData.photoOne, preview: false },
                { url: formData.photoTwo, preview: false },
                { url: formData.photoThree, preview: false },
                { url: formData.photoFour, preview: false }
            ];
    
            await dispatch(createSpotImage(response.id, images));
            history.push(`/spots/${response.id}`);
        } else {
            setErrors(response.errors);
        }
    };
    

    return (
        <div className="new-spot-form-wrapper">
            <div className="new-spot-form-inner-container">
                <h2>Create a new Spot</h2>
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
                        <span>Country <span className="error">{errors.country ? errors.country : ""}</span></span>
                        <input
                            type="text"
                            placeholder="Country"
                            value={formData.country}
                            onChange={(e) => updateField("country", e.target.value)}
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
                        <span>Street Address <span className="error">{errors.address ? errors.address : ""}</span></span>
                        <input
                            type="text"
                            placeholder="Street Address"
                            value={formData.street}
                            onChange={(e) => updateField("street", e.target.value)}
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
                            <span>City <span className="error">{errors.city ? errors.city : ""}</span></span>
                            <input
                                type="text"
                                placeholder="City"
                                value={formData.city}
                                onChange={(e) => updateField("city", e.target.value)}
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
                            <span>State <span className="error">{errors.state ? errors.state : ""}</span></span>
                            <input
                                type="text"
                                placeholder="STATE"
                                value={formData.state}
                                onChange={(e) => updateField("state", e.target.value)}
                                required
                            ></input>
                        </label>
                    </div>
                    <div style={{
                        borderTop: "1px solid grey",
                        marginTop: "2em"
                    }}>
                        <h3>Describe your place to guests</h3>
                        <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <textarea
                            placeholder="Please write at least 30 characters"
                            value={formData.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            minLength="30"
                            required
                        ></textarea>
                        <span className="error">{errors.description ? errors.description : ""}</span>
                    </div>
                    <div style={{
                        borderTop: "1px solid grey",
                        marginTop: "2em"
                    }}>
                        <h3>Create a title for your spot</h3>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                        <input
                            type="text"
                            placeholder="Name of your spot"
                            value={formData.title}
                            onChange={(e) => updateField("title", e.target.value)}
                            required
                        ></input>
                        <span className="error">{errors.name ? errors.name : ""}</span>
                    </div>
                    <div style={{
                        borderTop: "1px solid grey",
                        marginTop: "2em"
                    }}>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        <span style={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
                            $
                            <input
                                type="number"
                                placeholder="Price per night (USD)"
                                value={formData.price}
                                onChange={(e) => updateField("price", e.target.value)}
                                required
                            ></input>
                        </span>
                        <span className="error">{errors.price ? errors.price : ""}</span>
                    </div>
                    <div style={{
                        borderTop: "1px solid grey",
                        borderBottom: "1px solid grey",
                        marginTop: "2em"
                    }}>
                        <h3>Liven up your spot with photos</h3>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em", marginBottom: "2em" }}>
                            <input
                                type="text"
                                placeholder="Preview Image URL"
                                value={formData.previewImage}
                                onChange={(e) => updateField("previewImage", e.target.value)}
                                accept="image/png, image/jpg, image/jpeg"
                                required
                            ></input>
                            <input
                                type="text"
                                placeholder="Image One"
                                value={formData.photoOne}
                                onChange={(e) => updateField("photoOne", e.target.value)}
                                accept="image/png, image/jpg, image/jpeg"
                            ></input>
                            <input
                                type="text"
                                placeholder="Image Two"
                                value={formData.photoTwo}
                                onChange={(e) => updateField("photoTwo", e.target.value)}
                                accept="image/png, image/jpg, image/jpeg"
                            ></input>
                            <input
                                type="text"
                                placeholder="Image Three"
                                value={formData.photoThree}
                                onChange={(e) => updateField("photoThree", e.target.value)}
                                accept="image/png, image/jpg, image/jpeg"
                            ></input>    
                            <input
                                type="text"
                                placeholder="Image Four"
                                value={formData.photoFour}
                                onChange={(e) => updateField("photoFour", e.target.value)}
                                accept="image/png, image/jpg, image/jpeg"
                            ></input>                                                    
                            <span className="error">{errors.previewImageLength ? errors.previewImageLength : ""}</span>
                            <span className="error">{errors.previewImage ? errors.previewImage : ""}</span>
                            <span className="error">{errors.photoOne ? errors.photoOne : ""}</span>
                            <span className="error">{errors.photoTwo ? errors.photoTwo : ""}</span>
                            <span className="error">{errors.photoThree ? errors.photoThree : ""}</span>
                            <span className="error">{errors.photoFour ? errors.photoFour : ""}</span>

                            {/* Similar inputs for photoOne, photoTwo, photoThree, and photoFour */}
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
                        }}>Create Spot</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewSpotForm;
