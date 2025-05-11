import axios from "axios";

export const BASE_URL = "http://localhost:5000";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This is crucial for CORS with credentials
});

export const setAuthHeader = (token, api) => {
  token
    ? (api.defaults.headers.common["Authorization"] = `Bearer ${token}`)
    : delete api.defaults.headers.common["Authorization"];
};
