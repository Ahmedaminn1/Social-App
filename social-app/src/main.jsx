import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import CounterContextProvider from "./context/CounterContext.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider>
      <CounterContextProvider>
        <AuthContextProvider>
          <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </AuthContextProvider>
      </CounterContextProvider>
    </HeroUIProvider>
  </StrictMode>
);
