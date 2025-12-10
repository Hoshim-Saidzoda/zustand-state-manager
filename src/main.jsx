// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

// Обязательно создаём тему и оборачиваем всё приложение
const theme = createTheme({
  palette: {
    mode: "light", // или "dark" — как хочешь
    primary: {
      main: "#6366f1",
    },
    secondary: {
      main: "#ec4899",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* сбрасывает стили браузера + включает тёмную тему */}
      <App />
    </ThemeProvider>
  </React.StrictMode>
);