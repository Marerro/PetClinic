import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { Logout } from "../helpers/get";
import UserContext from "../context/UserContext.jsx";
import axios from "axios";

function Header() {
    const navigate = useNavigate();
    const { user, setUser, setLoading, setError } = useContext(UserContext);

    const logoutFunction = async () => {
        try {
            const response = await Logout(); 
            if (response) {
                setUser(null);
                navigate("/login");
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    setError(error.response.data.message || "An error occurred while logging out.");
                } else if (error.request) {
                    setError("No response received from the server.");
                } else {
                    setError("An error occurred while logging out.");
                }
            } else {
                setError("Unexpected error occurred.");
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="bg-violet-800 w-full h-[5vh] flex items-center justify-between px-6">
            <div className="flex-1 flex justify-center">
                <h1 className="text-white text-[25px]">Pets Medicare</h1>
            </div>

        
            {user && (
                <button
                    onClick={logoutFunction}
                    className="text-white text-[20px]"
                >
                    Logout
                </button>
            )}
        </div>
    );
}

export default Header;