
import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const axiosInstance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
        "Access-Control-Allow-Origin": "*",
    }
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    },
);

export default axiosInstance;