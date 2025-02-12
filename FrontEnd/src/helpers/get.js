import axios from "axios";
const appAPI = import.meta.env.VITE_APP_API;

export const getAllAppointments = async () => {
    const response = await axios.get(`${appAPI}/appointment`)
    return response.data;
}