import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/api/login",
                { username, password },
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.data.status === "OK") {
                navigate("/banking");
            }            

        } catch (error) {
            if (error.response) {
                // Server responded with 401
                alert("Wrong username or password!");
            } else {
                // Network / CORS issue
                alert("Cannot connect to server. Is it running?");
            }
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