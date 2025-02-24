import { useState } from "react";
import axios from "axios";

export default function RegisterModal({ onClose }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_HOST}/users/register`,
                { name, email, password }
            );
            onClose();
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-black">
            <div className="bg-white p-6 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Register</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border rounded mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex justify-end">
                    <button className="mr-2 px-3 py-1 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
                    <button className="px-3 py-1 bg-stone-900  text-white rounded" onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    );
}
