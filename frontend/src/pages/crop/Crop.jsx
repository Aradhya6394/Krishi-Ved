import { useState } from "react";
import {
    FaSeedling,
    FaFlask,
    FaTemperatureHigh,
    FaTint,
    FaCloudRain,
    FaCheckCircle,
    FaLeaf
} from "react-icons/fa";

import { recommendCrops } from "./crop.service.js";


const Crop = () => {

    const [formData, setFormData] = useState({
        nitrogen: "",
        phosphorus: "",
        potassium: "",
        temperature: "",
        humidity: "",
        ph: "",
        rainfall: ""
    });

    const [recommendations, setRecommendations] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setRecommendations([]);

        setLoading(true);

        try {

            const cropData = {
                nitrogen: Number(formData.nitrogen),
                phosphorus: Number(formData.phosphorus),
                potassium: Number(formData.potassium),
                temperature: Number(formData.temperature),
                humidity: Number(formData.humidity),
                ph: Number(formData.ph),
                rainfall: Number(formData.rainfall)
            };


            const result = await recommendCrops(cropData);

            setRecommendations(result);

        } catch (error) {

            setError(
                error.message || "Failed to generate recommendations"
            );

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="min-h-screen bg-emerald-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-7xl">

                {/* HEADER */}

                <div className="mb-8">

                    <div className="flex items-center gap-3">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">

                            <FaSeedling className="text-2xl text-emerald-600" />

                        </div>

                        <div>

                            <h1 className="text-3xl font-bold text-slate-800">
                                Crop Planning
                            </h1>

                            <p className="mt-1 text-sm text-slate-500 sm:text-base">
                                Find the most suitable crops for your farm conditions.
                            </p>

                        </div>

                    </div>

                </div>


                {/* INPUT SECTION */}

                <section className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm sm:p-7">

                    <div className="mb-6">

                        <h2 className="text-xl font-bold text-slate-800">
                            Enter Farm Conditions
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Provide your soil and weather information to get crop recommendations.
                        </p>

                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">


                            {/* NITROGEN */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Nitrogen (N)
                                </label>

                                <div className="relative">

                                    <FaFlask className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />

                                    <input
                                        type="number"
                                        name="nitrogen"
                                        value={formData.nitrogen}
                                        onChange={handleChange}
                                        min="0"
                                        step="any"
                                        placeholder="e.g. 80"
                                        required
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    />

                                </div>

                            </div>


                            {/* PHOSPHORUS */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Phosphorus (P)
                                </label>

                                <div className="relative">

                                    <FaFlask className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />

                                    <input
                                        type="number"
                                        name="phosphorus"
                                        value={formData.phosphorus}
                                        onChange={handleChange}
                                        min="0"
                                        step="any"
                                        placeholder="e.g. 40"
                                        required
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    />

                                </div>

                            </div>


                            {/* POTASSIUM */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Potassium (K)
                                </label>

                                <div className="relative">

                                    <FaFlask className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />

                                    <input
                                        type="number"
                                        name="potassium"
                                        value={formData.potassium}
                                        onChange={handleChange}
                                        min="0"
                                        step="any"
                                        placeholder="e.g. 50"
                                        required
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    />

                                </div>

                            </div>


                            {/* TEMPERATURE */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Temperature (°C)
                                </label>

                                <div className="relative">

                                    <FaTemperatureHigh className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" />

                                    <input
                                        type="number"
                                        name="temperature"
                                        value={formData.temperature}
                                        onChange={handleChange}
                                        step="any"
                                        placeholder="e.g. 28"
                                        required
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    />

                                </div>

                            </div>


                            {/* HUMIDITY */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Humidity (%)
                                </label>

                                <div className="relative">

                                    <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                    <input
                                        type="number"
                                        name="humidity"
                                        value={formData.humidity}
                                        onChange={handleChange}
                                        min="0"
                                        max="100"
                                        step="any"
                                        placeholder="e.g. 70"
                                        required
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    />

                                </div>

                            </div>


                            {/* SOIL PH */}

                            <div>

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Soil pH
                                </label>

                                <div className="relative">

                                    <FaLeaf className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500" />

                                    <input
                                        type="number"
                                        name="ph"
                                        value={formData.ph}
                                        onChange={handleChange}
                                        min="0"
                                        max="14"
                                        step="0.1"
                                        placeholder="e.g. 6.5"
                                        required
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    />

                                </div>

                            </div>


                            {/* RAINFALL */}

                            <div className="sm:col-span-2 lg:col-span-3">

                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Rainfall (mm)
                                </label>

                                <div className="relative max-w-md">

                                    <FaCloudRain className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />

                                    <input
                                        type="number"
                                        name="rainfall"
                                        value={formData.rainfall}
                                        onChange={handleChange}
                                        min="0"
                                        step="any"
                                        placeholder="e.g. 120"
                                        required
                                        className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                                    />

                                </div>

                            </div>

                        </div>


                        {/* ERROR */}

                        {error && (

                            <div className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                                {error}
                            </div>

                        )}


                        {/* BUTTON */}

                        <div className="mt-7">

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-emerald-600 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                            >

                                {loading
                                    ? "Analyzing..."
                                    : "Get Crop Recommendations"
                                }

                            </button>

                        </div>

                    </form>

                </section>


                {/* RESULTS */}

                {recommendations.length > 0 && (

                    <section className="mt-10">

                        <div className="mb-5">

                            <h2 className="text-2xl font-bold text-slate-800">
                                Recommended Crops
                            </h2>

                            <p className="mt-1 text-sm text-slate-500 sm:text-base">
                                Based on the soil and weather conditions you provided.
                            </p>

                        </div>


                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

                            {recommendations.map((recommendation, index) => (

                                <div
                                    key={recommendation.crop}
                                    className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm"
                                >

                                    {/* CROP HEADER */}

                                    <div className="flex items-start justify-between gap-3">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">

                                                <FaSeedling className="text-xl text-emerald-600" />

                                            </div>

                                            <div>

                                                <h3 className="text-lg font-bold text-slate-800">
                                                    {recommendation.crop}
                                                </h3>

                                                <p className="text-sm text-slate-500">
                                                    Recommendation #{index + 1}
                                                </p>

                                            </div>

                                        </div>

                                    </div>


                                    {/* SCORE */}

                                    <div className="mt-6">

                                        <div className="flex items-center justify-between">

                                            <span className="text-sm font-medium text-slate-500">
                                                Suitability
                                            </span>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-bold ${
                                                    recommendation.suitability === "High"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : recommendation.suitability === "Medium"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {recommendation.suitability}
                                            </span>

                                        </div>


                                        <div className="mt-2 flex items-end gap-1">

                                            <span className="text-3xl font-bold text-slate-800">
                                                {recommendation.score}%
                                            </span>

                                            <span className="mb-1 text-sm text-slate-500">
                                                suitable
                                            </span>

                                        </div>


                                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">

                                            <div
                                                className="h-full rounded-full bg-emerald-500"
                                                style={{
                                                    width: `${recommendation.score}%`
                                                }}
                                            />

                                        </div>

                                    </div>


                                    {/* MATCHED CONDITIONS */}

                                    <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">

                                        <FaCheckCircle className="text-emerald-500" />

                                        <span>
                                            {recommendation.matchedConditions}/7 conditions matched
                                        </span>

                                    </div>


                                    {/* REASON */}

                                    <div className="mt-5 rounded-xl bg-slate-50 p-4">

                                        <p className="text-sm leading-6 text-slate-600">
                                            {recommendation.reason}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </section>

                )}

            </div>

        </div>
    );
};


export default Crop;