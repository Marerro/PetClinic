import axios from "axios";

const usersAPI = import.meta.env.VITE_USERS_API;
const appAPI = import.meta.env.VITE_APP_API;

export const postUser = async (data) => {
    const response = await axios.post(`${usersAPI}/signup`, data, {withCredentials: true});
    return response.data;
}

export const postLogin = async (data) => {
    const response = await axios.post(`${usersAPI}/login`, data, {withCredentials: true});
    return response.data;
}

export const postAppointment = async (data) => {
    const response = await axios.post(`${appAPI}/appointment`, data, {
        withCredentials: true
    });
    console.log(data);
    return response.data;
}
