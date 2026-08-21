import {
    FaCloudSun,
    FaSeedling,
    FaTint,
    FaChartLine,
    FaVirus,
    FaUniversity,
    FaClipboardList,
    FaRobot,
    FaBars,
    FaTimes,
    FaHome,
    FaTractor
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const menuItems = [
        {
            name: "Dashboard",
            icon: <FaHome />,
            path: "/dashboard"
        },
        {
            name: "Weather",
            icon: <FaCloudSun />,
            path: "/weather"
        },
        {
            name: "Crop Planning",
            icon: <FaSeedling />,
            path: "/crop"
        },
        {
            name: "Disease Detection",
            icon: <FaVirus />,
            path: "/disease"
        },
        {
            name: "Irrigation",
            icon: <FaTint />,
            path: "/irrigation"
        },
        {
            name: "Mandi Prices",
            icon: <FaChartLine />,
            path: "/mandi"
        },
        {
            name: "Government Schemes",
            icon: <FaUniversity />,
            path: "/schemes"
        },
        {
            name: "Crop Activity",
            icon: <FaClipboardList />,
            path: "/crop-activity"
        },
        {
            name: "AI Chatbot",
            icon: <FaRobot />,
            path: "/chatbot"
        }
    ];

    const dashboardCards = [
        {
            title: "Weather",
            description: "Check today's weather and upcoming forecast.",
            icon: <FaCloudSun />,
            path: "/weather"
        },
        {
            title: "Crop Planning",
            description: "Get smart crop recommendations for your farm.",
            icon: <FaSeedling />,
            path: "/crop"
        },
        {
            title: "Disease Detection",
            description: "Detect crop diseases using AI-powered analysis.",
            icon: <FaVirus />,
            path: "/disease"
        },
        {
            title: "Irrigation",
            description: "Know when and how much to irrigate your crops.",
            icon: <FaTint />,
            path: "/irrigation"
        },
        {
            title: "Mandi Prices",
            description: "Check current market prices for your crops.",
            icon: <FaChartLine />,
            path: "/mandi"
        },
        {
            title: "Government Schemes",
            description: "Find schemes and subsidies available for farmers.",
            icon: <FaUniversity />,
            path: "/schemes"
        }
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-green-50">

            {/* =========================
                TOP NAVBAR
            ========================= */}

            <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-green-100 bg-white">

                <div className="flex h-full items-center justify-between px-4 sm:px-6">

                    {/* Logo */}

                    <div className="flex items-center gap-2">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                            <FaSeedling className="text-xl text-green-600" />
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-green-700 sm:text-2xl">
                                KrishiVed
                            </h1>

                            <p className="hidden text-xs text-gray-400 sm:block">
                                Smart Farming Assistant
                            </p>
                        </div>

                    </div>


                    {/* Desktop Farmer Profile */}

                    <div className="hidden items-center gap-3 sm:flex">

                        <div className="text-right">
                            <p className="text-sm font-medium text-gray-700">
                                Welcome, Farmer
                            </p>

                            <p className="text-xs text-gray-400">
                                Your smart farming assistant
                            </p>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white">
                            F
                        </div>

                    </div>


                    {/* Mobile Menu Button */}

                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="rounded-lg p-2 text-gray-700 hover:bg-green-50 sm:hidden"
                    >
                        {mobileMenuOpen ? (
                            <FaTimes className="text-xl" />
                        ) : (
                            <FaBars className="text-xl" />
                        )}
                    </button>

                </div>

            </header>


            {/* =========================
                MOBILE SIDEBAR
            ========================= */}

            {mobileMenuOpen && (

                <div className="fixed inset-0 z-40 bg-black/30 sm:hidden">

                    <div className="absolute left-0 top-16 h-[calc(100vh-4rem)] w-72 overflow-y-auto bg-white shadow-xl">

                        <div className="p-4">

                            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                                Menu
                            </p>

                            <div className="space-y-1">

                                {menuItems.map((item) => (

                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigation(item.path)}
                                        className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition ${
                                            item.name === "Dashboard"
                                                ? "bg-green-100 font-semibold text-green-700"
                                                : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                                        }`}
                                    >

                                        <span className="text-lg">
                                            {item.icon}
                                        </span>

                                        <span>
                                            {item.name}
                                        </span>

                                    </button>

                                ))}

                            </div>

                        </div>

                    </div>

                </div>

            )}


            {/* =========================
                DESKTOP SIDEBAR
            ========================= */}

            <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-green-100 bg-white sm:block">

                <div className="p-4">

                    <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Menu
                    </p>

                    <div className="space-y-1">

                        {menuItems.map((item) => (

                            <button
                                key={item.name}
                                onClick={() => handleNavigation(item.path)}
                                className={`flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left transition ${
                                    item.name === "Dashboard"
                                        ? "bg-green-100 font-semibold text-green-700"
                                        : "text-gray-600 hover:bg-green-50 hover:text-green-700"
                                }`}
                            >

                                <span className="text-lg">
                                    {item.icon}
                                </span>

                                <span className="text-sm">
                                    {item.name}
                                </span>

                            </button>

                        ))}

                    </div>

                </div>

            </aside>


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="pt-16 sm:ml-64">

                <div className="p-4 sm:p-6 lg:p-8">


                    {/* =========================
                        WELCOME SECTION
                    ========================= */}

                    <section className="mb-6 rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 p-5 text-white shadow-sm sm:p-7">

                        <div className="flex items-center gap-4">

                            <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-white/20 sm:flex">
                                <FaTractor className="text-2xl" />
                            </div>

                            <div>

                                <p className="mb-1 text-sm text-teal-100">
                                    Welcome back, Farmer 👋
                                </p>

                                <h2 className="text-2xl font-bold sm:text-3xl">
                                    Your Farm Dashboard
                                </h2>

                                <p className="mt-1 text-sm text-green-100">
                                    Manage your farm and make smarter farming decisions.
                                </p>

                            </div>

                        </div>

                    </section>


                    {/* =========================
                        QUICK STATS
                    ========================= */}

                    <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

                        <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">

                            <p className="text-xs text-gray-500">
                                Farm Status
                            </p>

                            <p className="mt-1 text-lg font-bold text-green-600">
                                Active
                            </p>

                        </div>


                        <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">

                            <p className="text-xs text-gray-500">
                                Today's Weather
                            </p>

                            <p className="mt-1 text-lg font-bold text-gray-800">
                                Check Now
                            </p>

                        </div>


                        <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">

                            <p className="text-xs text-gray-500">
                                Irrigation
                            </p>

                            <p className="mt-1 text-lg font-bold text-blue-600">
                                Check Now
                            </p>

                        </div>


                        <div className="rounded-2xl border border-green-100 bg-white p-4 shadow-sm">

                            <p className="text-xs text-gray-500">
                                Mandi Prices
                            </p>

                            <p className="mt-1 text-lg font-bold text-orange-500">
                                View Prices
                            </p>

                        </div>

                    </section>


                    {/* =========================
                        MODULES
                    ========================= */}

                    <section>

                        <div className="mb-4">

                            <h2 className="text-xl font-bold text-gray-800">
                                Farm Modules
                            </h2>

                            <p className="mt-1 text-sm text-gray-500">
                                Choose a module to manage your farming activities.
                            </p>

                        </div>


                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                            {dashboardCards.map((card) => (

                                <button
                                    key={card.title}
                                    onClick={() => handleNavigation(card.path)}
                                    className="group rounded-2xl border border-green-100 bg-white p-5 text-left shadow-sm transition hover:-translate-y-1 hover:border-green-200 hover:shadow-md"
                                >

                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-xl text-green-600 transition group-hover:bg-green-100">
                                        {card.icon}
                                    </div>

                                    <h3 className="text-lg font-semibold text-gray-800">
                                        {card.title}
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        {card.description}
                                    </p>

                                    <p className="mt-4 text-sm font-semibold text-green-600">
                                        Open module →
                                    </p>

                                </button>

                            ))}

                        </div>

                    </section>


                    {/* =========================
                        AI ASSISTANT
                    ========================= */}

                    <section className="mt-6 rounded-2xl border border-green-100 bg-white p-5 shadow-sm sm:p-6">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-start gap-4">

                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-xl text-green-600">
                                    <FaRobot />
                                </div>

                                <div>

                                    <h2 className="text-lg font-bold text-gray-800">
                                        Need help with your farm?
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Ask KrishiVed AI about crops, diseases, irrigation,
                                        weather or farming practices.
                                    </p>

                                </div>

                            </div>

                            <button
                                onClick={() => handleNavigation("/chatbot")}
                                className="rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                            >
                                Ask KrishiVed AI
                            </button>

                        </div>

                    </section>

                </div>

            </main>

        </div>
    );
}

export default Dashboard;