import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BankingPage from "./pages/BankingPage";

export default function App () {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/banking" element={<BankingPage />} 
                />
            </Routes>
        </BrowserRouter>
    );
}