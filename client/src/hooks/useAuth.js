const useAuth = () => {
  const isAuthenticated =
    localStorage.getItem("userId") === null ? false : true;
  const isAdmin = localStorage.getItem("isAdmin") === "1" ? true : false;

  return { isAuthenticated, isAdmin };
};

export default useAuth;
