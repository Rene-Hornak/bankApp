import { login } from "../api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        // Prevent page refresh
        e.preventDefault();

        try {
            // Send POST request to backend login endpoint
            const response = await login(username, password);
            // Store token in browser storage
            localStorage.setItem("token", response.data.token);
            // redirect to protected banking page
            navigate("/banking");
        } catch (error) {
            alert("Login failed");
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="name">Name:</label>
                <input 
                    type="text" 
                    id="name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label htmlFor="pass">Password:</label>
                <input 
                    type="password" 
                    id="pass" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />   

                <button type="submit">Login</button>
            </form>
        </div>
    );
}