import axios from "axios"

const appAPI = import.meta.env.VITE_APP_API

export const updateAppointment = async (id, data) => {
    const response = await axios.patch(`${appAPI}/${id}`, data, {
        withCredentials: true
    });
    return response.data;
}

export const deleteAppointment = async (id) => {
    const response = await axios.delete(`${appAPI}/${id}`, {
        withCredentials: true
    });
    return response.data;
}