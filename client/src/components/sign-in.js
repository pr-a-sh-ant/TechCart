import * as React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
import { SignInPage } from "@toolpad/core/SignInPage";
import { useTheme } from "@mui/material/styles";

import useAuth from "../hooks/useAuth";

// preview-start
const providers = [{ id: "credentials", name: "Email and Password" }];
// preview-end
function SignUpLink() {
  return <a href="/register">Sign up</a>;
}

export default function CredentialsSignInPage() {
  const { signIn } = useAuth();
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
