import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Import ./pages
import LoginPage from "./pages/LoginPage";
import BankingPage from "./pages/BankingPage";

export default function App () {
    // Get JWT token from browser storage
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route 
                    path="/banking" 
                    element={
                        token 
                            ? <BankingPage /> 
                            : <Navigate to="/login"/>
                        } 
                />

                {/* Redirect unkonwn routes to login */}
                <Route path="*" element={<Navigate to="/login"/>} />
            </Routes>
        </BrowserRouter>
    );
}