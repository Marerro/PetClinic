import UserContext from "./UserContext";    
import { useState, useEffect } from "react";
import axios from "axios"

const API_URL = import.meta.env.VITE_USERS_API

const UserContextProvider = ({children}) => {  
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            try {
                const { data: response } = await axios.get(`${API_URL}/me`, {withCredentials: true});
                setUser(response);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false)
            }
        }
        getUser()
        }, []);
    

        return (
            <UserContext.Provider value={{user, setUser, error, setError, loading}}>
                {children}
            </UserContext.Provider>
        )
}

export default UserContextProvider