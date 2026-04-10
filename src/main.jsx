import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { HouseProvider } from "./context/HouseContext";
import { Toaster } from "react-hot-toast";
import "leaflet/dist/leaflet.css";




ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <HouseProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "#020617",
            color: "#fff",
            padding: "12px 16px",
            fontSize: "14px"
          }
        }}
      />
      <App />
    </HouseProvider>
  </BrowserRouter>
);
