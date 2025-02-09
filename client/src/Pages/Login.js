import React from "react";
import CredentialSignIn from "../components/sign-in";
const Login = () => {
  return (
    <div id="login" className="">
      <CredentialSignIn />
      <div className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/login" className="text-blue-500 hover:text-blue-600">
          Sign in
        </a>
      </div>
    </div>
  );
};

export default Login;
