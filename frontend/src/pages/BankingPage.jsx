import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function BankingPage() {
    // Store message returned from backend
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    // useEffect runs when component loads
    useEffect(() => {

        // Get stored JWT token
        const token = localStorage.getItem("token");

        // If no token → redirect to /login
        if(!token) {
            navigate("/login");
            return;
        }

        // fetch protected data from backend
        axios
            .get("http://localhost:8080/api/protected", {
                headers: {
                    // Send JWT token in Authorization header
                    Authorization: `Bearer ${token}`
                },
            })
            .then((res) => setMessage(res.data.message || "Welcome to Banking Page!"))
            .catch((err) => {
                console.error(err);
                alert("Unauthorized. Please log in again.");
                localStorage.removeItem("token");
                navigate("/login");
            });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div>
            <h2>Banking Dashboard</h2>
            <p>{message}</p>

            <button onClick={handleLogout} >Logout</button>
        </div>
    )
}