// frontend/src/index.js
import React from "react";
import { createRoot } from "react-dom/client"; // Changed to createRoot
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container); // Create root for React 18

root.render(<App />);
