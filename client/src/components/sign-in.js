import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";
import toast from "react-hot-toast";
import { getBaseURL } from "../apiconfig";

// preview-start
const providers = [{ id: "credentials", name: "Email and Password" }];
// preview-end

const signIn = async (provider, formData) => {
  try {
    const res = await fetch(`${getBaseURL()}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    if (!res.ok) {
      throw new Error("Invalid Credentials");
    } else {
      const data = await res.json();
      console.log(data.result);
      localStorage.setItem("token", data.result.token);
      localStorage.setItem("refreshToken", data.result.refreshToken);
      localStorage.setItem("userId", data.result.userId);
      localStorage.setItem("isAdmin", data.result.isAdmin);
      window.location.href = "/";
      toast.success("Successfully Logged In");
    }
  } catch (error) {
    toast.error(error.message);
  }
};
function SignUpLink() {
  return <a href="/register">Sign up</a>;
}

export default function CredentialsSignInPage() {
  const theme = useTheme();
  return (
    // preview-start
    <AppProvider theme={theme}>
      <SignInPage
        signIn={signIn}
        providers={providers}
        slotProps={{ emailField: { autoFocus: false } }}
        slots={{ signUpLink: SignUpLink }}
      />
    </AppProvider>
    // preview-end
  );
}
