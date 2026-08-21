import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaPhone,
    FaMapMarkerAlt,
    FaSeedling
} from "react-icons/fa";
import farmBackground from "../../assets/farm-login-bg.png";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        phone: "",
        state: "",
        district: "",
        role: "Farmer",
        language: "Hindi"
    });

    const [showPassword, setShowPassword] = useState(false);
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
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message ||
                    "Registration failed"
                );
            }

            navigate("/login");

        } catch (error) {
            setError(
                error.message ||
                "Unable to register. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden">

            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${farmBackground})`
                }}
            />

            <div className="absolute inset-0 bg-black/45" />

            <div className="relative z-10 flex h-full w-full items-center justify-center overflow-y-auto px-4 py-4 sm:px-6">

                <div className="my-auto w-full max-w-lg rounded-3xl bg-white/95 p-5 shadow-2xl sm:p-7">

                    <div className="mb-4 text-center">

                        <div className="mb-1 flex items-center justify-center gap-2">
                            <FaSeedling className="text-2xl text-green-600" />

                            <h1 className="text-2xl font-bold text-green-700">
                                KrishiVed
                            </h1>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800">
                            Create Account
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Join KrishiVed for smarter farming
                        </p>

                    </div>

                    {error && (
                        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-3"
                    >

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Full Name
                            </label>

                            <div className="relative">
                                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    required
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-green-50/60 pl-11 pr-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Email
                            </label>

                            <div className="relative">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    required
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-green-50/60 pl-11 pr-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            <div className="relative">
                                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                                <input
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    required
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-green-50/60 pl-11 pr-12 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-green-600"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash />
                                    ) : (
                                        <FaEye />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Phone Number
                            </label>

                            <div className="relative">
                                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="10 digit phone number"
                                    maxLength="10"
                                    required
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-green-50/60 pl-11 pr-4 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    State
                                </label>

                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        required
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-green-50/60 pl-11 pr-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    District
                                </label>

                                <div className="relative">
                                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" />

                                    <input
                                        type="text"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        placeholder="District"
                                        required
                                        className="h-11 w-full rounded-xl border border-gray-200 bg-green-50/60 pl-11 pr-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Language
                                </label>

                                <select
                                    name="language"
                                    value={formData.language}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-green-50/60 px-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                >
                                    <option value="Hindi">
                                        Hindi
                                    </option>

                                    <option value="English">
                                        English
                                    </option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Role
                                </label>

                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="h-11 w-full rounded-xl border border-gray-200 bg-green-50/60 px-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                >
                                    <option value="Farmer">
                                        Farmer
                                    </option>
                                </select>
                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-2 h-11 w-full rounded-xl bg-green-600 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Creating account..."
                                : "Create Account"}
                        </button>

                    </form>

                    <p className="mt-4 text-center text-sm text-gray-500">
                        Already have an account?{" "}

                        <Link
                            to="/login"
                            className="font-semibold text-green-600 hover:text-green-700"
                        >
                            Login
                        </Link>
                    </p>

                </div>

            </div>

            {/* <div className="absolute bottom-3 left-0 z-10 w-full px-4 text-center text-sm font-medium text-white drop-shadow-md">
                <span className="mr-1">🌾</span>
                Smart Farming • Better Decisions
            </div> */}

        </div>
    );
}

export default Register;