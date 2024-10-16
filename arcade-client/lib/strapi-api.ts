import axios from "axios";
import { useGetToken } from "../application/token/usetGetToken";
import { getAuth } from "firebase/auth";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_API_ENDPOINT,
});

http.interceptors.request.use(async (request) => {
  const { getToken } = useGetToken();
  const token = await getToken();
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const auth = getAuth();
        const newIdToken = await auth.currentUser?.getIdToken(true);

        if (newIdToken) {
          localStorage.setItem("token", newIdToken);
          originalRequest.headers.Authorization = `Bearer ${newIdToken}`;
          return http(originalRequest);
        } else {
          return Promise.reject(error);
        }
      } catch (tokenError) {
        return Promise.reject(tokenError);
      }
    }
    return Promise.reject(error);
  }
);

export default http;
