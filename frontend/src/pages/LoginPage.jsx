import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (email === "user@site.com" && password === "1234") {
            navigate("/banking");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email:</label>
                <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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