import toast from "react-hot-toast";
import { getBaseURL } from "../apiconfig";
import useCartService from "./useCart";

const useAuth = () => {
  const { clear, setItems } = useCartService();
  const isAuthenticated =
    localStorage.getItem("userId") === null ? false : true;
  const isAdmin = localStorage.getItem("isAdmin") === "1" ? true : false;
  const userId = localStorage.getItem("userId");

  const signIn = (provider, formData) => {
    fetch(`${getBaseURL()}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Invalid Credentials");
        }
        return res.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.result.token);
        localStorage.setItem("refreshToken", data.result.refreshToken);
        localStorage.setItem("userId", data.result.userId);
        localStorage.setItem("isAdmin", data.result.isAdmin);
        // Fetch cart details after login
        return fetch(`${getBaseURL()}/cart/${data.result.userId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.result.token}`,
            "Content-Type": "application/json",
          },
        }).then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch cart details");
          }
          return res.json();
        });
      })
      .then((response) => {
        setItems(response);
        window.location.href = "/";
        toast.success("Successfully Logged In");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    clear();
    window.location.href = "/";
  };

  return { isAuthenticated, isAdmin, logout, userId, signIn };
};

export default useAuth;
