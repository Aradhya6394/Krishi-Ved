import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSeedling } from "react-icons/fa";
import farmBackground from "../../assets/farm-login-bg.png";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
                "http://localhost:5000/api/auth/login",
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
                    result.message || "Login failed"
                );
            }

            localStorage.setItem(
                "token",
                result.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(result.data.user)
            );

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.message ||
                "Unable to login. Please try again."
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

            <div className="relative z-10 flex h-full w-full items-center justify-center px-4 py-4 sm:px-6">

                <div className="w-full max-w-md rounded-3xl bg-white/95 p-5 shadow-2xl sm:p-7">

                    <div className="mb-5 text-center">

                        <div className="mb-2 flex items-center justify-center gap-2">
                            <FaSeedling className="text-2xl text-green-600" />

                            <h1 className="text-2xl font-bold text-green-700 sm:text-3xl">
                                KrishiVed
                            </h1>
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800">
                            Welcome Back
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Login to your account
                        </p>

                    </div>

                    {error && (
                        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
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
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-green-50/60 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                />

                            </div>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-sm font-medium text-gray-700">
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
                                    placeholder="Enter your password"
                                    required
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-green-50/60 pl-11 pr-12 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200"
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

                        <div className="flex items-center justify-between text-sm">

                            <label className="flex cursor-pointer items-center gap-2 text-gray-600">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-green-600"
                                />

                                Remember me
                            </label>

                            <button
                                type="button"
                                className="font-medium text-green-600 hover:text-green-700"
                            >
                                Forgot password?
                            </button>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="h-12 w-full rounded-xl bg-green-600 font-semibold text-white shadow-md transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading
                                ? "Logging in..."
                                : "Login"}
                        </button>

                    </form>

                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-sm text-gray-400">
                            or
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <button
                        type="button"
                        className="h-12 w-full rounded-xl border border-gray-200 bg-white font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        Continue with Google
                    </button>

                    <p className="mt-5 text-center text-sm text-gray-500">
                        Don't have an account?{" "}
                        <Link
                            to="/register"
                            className="font-semibold text-green-600 hover:text-green-700"
                        >
                            Create account
                        </Link>
                    </p>

                </div>
            </div>

            

        </div>
    );
}

export default Login;