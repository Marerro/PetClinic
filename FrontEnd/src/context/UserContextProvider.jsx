import UserContext from "./UserContext";    
import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_USERS_API;

const UserContextProvider = ({ children }) => {  
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const getUser = async () => {
        try {
            const { data: response } = await axios.get(`${API_URL}/me`, { withCredentials: true });
            setUser(response.data);
        } catch (error) {
            setUser(null);
            setError(error.response?.data.message || "An error occurred while fetching user data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, error, setError, loading, getUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
