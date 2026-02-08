import { useNavigate } from "react-router-dom";

export default function BankingPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    }

    return (
        <div>
            <h2>Banking Dashboard</h2>
            <p>Welcome! You are now logged in.</p>

            <button onClick={handleLogout} >Logout</button>
        </div>
    )
}