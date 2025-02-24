import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

export default function Navbar() {
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <nav className="bg-stone-900 text-white p-4 flex justify-between">
            <h1 className="text-lg font-bold">Ana's Internship Task</h1>
            <div>
                <button
                    className="bg-white text-stone-900  px-3 py-1 rounded mr-2"
                    onClick={() => setShowLogin(true)}
                >
                    Login
                </button>
                <button
                    className="bg-white text-stone-900  px-3 py-1 rounded"
                    onClick={() => setShowRegister(true)}
                >
                    Register
                </button>
            </div>

            {/* Modals */}
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            {showRegister && <RegisterModal onClose={() => setShowRegister(false)} />}
        </nav>
    );
}
