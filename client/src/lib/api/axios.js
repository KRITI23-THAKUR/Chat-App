import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
import { getToken } from "../localstorage";

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
	(config) => {
		const token = getToken();
		if (token) config.headers.authorization = `Bearer ${token}`;
		return config;
	},
	(error) => Promise.reject(error),
);

export default axiosInstance
