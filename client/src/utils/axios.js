import axios from "axios";
import { getBaseURL } from "../apiconfig";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const baseURL = getBaseURL();

const useAxios = () => {
  const accessToken = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const user = jwtDecode(accessToken);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const refreshToken = localStorage.getItem("refreshToken");
    const response = await axios.post(`${baseURL}/token/refreshToken`, {
      refreshToken,
    });
    const newToken = response.data.token;

    localStorage.setItem("token", newToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    req.headers.Authorization = `Bearer ${newToken}`;

    return req;
  });

  return axiosInstance;
};

export default useAxios;
