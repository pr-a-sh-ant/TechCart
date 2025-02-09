const useAuth = () => {
  const isAuthenticated =
    localStorage.getItem("userId") === null ? false : true;
  const isAdmin = localStorage.getItem("isAdmin") === "1" ? true : false;

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    window.location.href = "/";
  };

  return { isAuthenticated, isAdmin, logout };
};

export default useAuth;
