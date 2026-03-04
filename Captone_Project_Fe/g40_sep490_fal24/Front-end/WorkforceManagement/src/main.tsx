import ReactDOM from "react-dom/client";
import "./index.css";
import AppRouter from "./AppRouter.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider
    clientId="425158386220-2e58dfejoou0levld7q8g17vn9k3fvi5.apps.googleusercontent.com"
  >
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: { padding: "20px" },
          }}
        />
        <AppRouter />
      </QueryClientProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
