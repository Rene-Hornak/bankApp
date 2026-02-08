import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import BankingPage from "./pages/BankingPage";

export default function App () {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/banking" element={<BankingPage />} />
            </Routes>
        </Router>
    );
}