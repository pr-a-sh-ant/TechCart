import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { cartStore } from "../hooks/useCart";

const queryClient = new QueryClient();

const Provider = ({ children }) => {
  const updateStore = () => {
    cartStore.persist.rehydrate();
  };

  // cart will be refreshed on cart change  n browser
  useEffect(() => {
    document.addEventListener("visibilitychange", updateStore);
    window.addEventListener("focus", updateStore);
    return () => {
      document.removeEventListener("visibilitychange", updateStore);
      window.removeEventListener("focus", updateStore);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

export default Provider;
