import { useState } from "react";
import { recommendCrops } from "../../services/crop.service";
import "../../styles/crop.css";

const Crop = () => {
    const [formData, setFormData] = useState({
        location: "",
        season: "",
        soilType: "",
        irrigation: "",
        previousCrop: ""
    });

    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setRecommendations([]);
        setLoading(true);

        try {
            const result = await recommendCrops(formData);
            setRecommendations(result);
        } catch (error) {
            console.error(error);
            setError("Unable to get crop recommendations. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="crop-page">

            <header className="crop-header">
                <div className="crop-header-left">
                    <button
                        className="crop-back-btn"
                        onClick={() => window.history.back()}
                    >
                        ←
                    </button>

                    <div>
                        <h1>Crop Planning</h1>
                        <p>Smart crop recommendations for your farm</p>
                    </div>
                </div>

                <div className="crop-brand">
                    🌿 <span>KrishiVed</span>
                </div>
            </header>

            <main className="crop-container">

                <section className="crop-intro">
                    <div className="intro-icon">🌱</div>

                    <div>
                        <h2>Find the Right Crop</h2>
                        <p>
                            Tell us about your farm and KrishiVed will
                            recommend suitable crops using our ML model.
                        </p>
                    </div>
                </section>

                <form className="crop-form" onSubmit={handleSubmit}>

                    <div className="crop-field">
                        <label>📍 Location</label>

                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Lucknow"
                            value={formData.location}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="crop-field">
                        <label>🌦️ Season</label>

                        <select
                            name="season"
                            value={formData.season}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select season</option>
                            <option value="Kharif">Kharif</option>
                            <option value="Rabi">Rabi</option>
                            <option value="Zaid">Zaid</option>
                        </select>
                    </div>

                    <div className="crop-field">
                        <label>🌱 Soil Type</label>

                        <select
                            name="soilType"
                            value={formData.soilType}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select soil type</option>
                            <option value="Alluvial">Alluvial</option>
                            <option value="Black">Black</option>
                            <option value="Red">Red</option>
                            <option value="Laterite">Laterite</option>
                            <option value="Sandy">Sandy</option>
                            <option value="Loamy">Loamy</option>
                            <option value="Clay">Clay</option>
                        </select>
                    </div>

                    <div className="crop-field">
                        <label>💧 Irrigation Availability</label>

                        <select
                            name="irrigation"
                            value={formData.irrigation}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select irrigation</option>
                            <option value="Available">Available</option>
                            <option value="Limited">Limited</option>
                            <option value="Rainfed">Rainfed</option>
                        </select>
                    </div>

                    <div className="crop-field previous-crop-field">
                        <label>🌾 Previous Crop</label>

                        <select
                            name="previousCrop"
                            value={formData.previousCrop}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select previous crop</option>
                            <option value="Rice">Rice</option>
                            <option value="Maize">Maize</option>
                            <option value="Wheat">Wheat</option>
                            <option value="Cotton">Cotton</option>
                            <option value="Chickpea">Chickpea</option>
                            <option value="Groundnut">Groundnut</option>
                            <option value="Soybean">Soybean</option>
                            <option value="Potato">Potato</option>
                            <option value="Sugarcane">Sugarcane</option>
                            <option value="None">None</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="recommend-btn"
                        disabled={loading}
                    >
                        {loading
                            ? "Finding Best Crops..."
                            : "🌱 Get Crop Recommendation"}
                    </button>

                </form>

                {error && (
                    <div className="crop-error">
                        ⚠️ {error}
                    </div>
                )}

                {recommendations.length > 0 && (
                    <section className="recommendation-section">

                        <div className="recommendation-heading">
                            <div>
                                <h2>🌾 Recommended Crops</h2>
                                <p>
                                    Based on the information provided about
                                    your farm
                                </p>
                            </div>
                        </div>

                        <div className="crop-results">

                            {recommendations.map((item, index) => (
                                <div
                                    className={`recommendation-card ${
                                        index === 0 ? "best-crop" : ""
                                    }`}
                                    key={`${item.crop}-${index}`}
                                >
                                    <div className="crop-rank">
                                        #{index + 1}
                                    </div>

                                    <div className="crop-result-icon">
                                        🌱
                                    </div>

                                    <h3>{item.crop}</h3>

                                    <div className="confidence-value">
                                        {item.confidence}%
                                    </div>

                                    <div className="confidence-label">
                                        Suitability
                                    </div>

                                    {index === 0 && (
                                        <span className="best-match">
                                            ⭐ Best Match
                                        </span>
                                    )}
                                </div>
                            ))}

                        </div>

                    </section>
                )}

            </main>
        </div>
    );
};

export default Crop;