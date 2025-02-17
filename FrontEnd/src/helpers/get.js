import axios from "axios";
const appAPI = import.meta.env.VITE_APP_API;
const VITE_USERS_API = import.meta.env.VITE_USERS_API

export const getAllAppointments = async () => {
    const response = await axios.get(`${appAPI}/appointment`)
    return response.data;
}

export const getFilteredAppointments = async (data, sort, order) => {
    const response = await axios.get(`${appAPI}/?search=${data}&sort=${sort}&order=${order}`, {
        withCredentials: true
    });    
    console.log(response);
    return response.data;
}

export const Logout = async () => {
    const response = await axios.get(`${VITE_USERS_API}/logout`);
    return response;
}