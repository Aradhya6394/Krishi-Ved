import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Weather from "./pages/weather/Weather";
import Crop from "./pages/crop/Crop";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Navigate to="/login" replace />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/crop" element={<Crop />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;