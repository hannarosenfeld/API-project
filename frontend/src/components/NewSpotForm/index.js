import "./NewSpotForm.css"


export default function NewSpotForm() {

    return (
        <div className="new-spot-form-wrapper">
            <div className="new-spot-form-inner-container">
                <h2>Create a new Spot</h2>
                <h3>Where's your place located?</h3>
                <p>Guests will only get your exact address once they booked a reservation</p>
                <form
                    style={{
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <label
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            marginBottom: "0.8em"
                        }}
                    >
                        Country
                        <input
                            type="text"
                            placeholder="Country"
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
                        ></input>
                    </div>
                    <div style={{
                        borderTop: "1px solid grey",
                        marginTop: "2em"
                        }}>
                        <h3>Set a base price for your spot</h3>
                        <p>Competitive pricing can help your listing stand out and rank higher
in search results.</p>
                        <span style={{display: "flex", alignItems: "center", gap: "0.5em"}}>$<input
                        type="text"
                        placeholder="Price per night (USD)"
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
                            ></input>
                            <input
                                type="text"
                                placeholder="Image URL"
                            ></input>
                            <input
                                type="text"
                                placeholder="Image URL"
                            ></input>
                            <input
                                type="text"
                                placeholder="Image URL"
                            ></input>
                            <input
                                type="text"
                                placeholder="Image URL"
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
                                }}>Create Spot</button>
                        </div>
                </form>
            </div>
        </div>
    )
}
