import axios from "axios";

const usersAPI = import.meta.env.VITE_USERS_API;

export const postUser = async (data) => {
    const response = await axios.post(`${usersAPI}/signup`, data, {withCredentials: true});
    return response.data;
}