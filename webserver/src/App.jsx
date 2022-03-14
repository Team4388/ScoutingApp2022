import logo from "./logo.svg";
import Navigation from "./components/Navigation/Navigation";
import { DbProvider } from "./DbContext";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import "./App.css";
// const Cushion = require('cushiondb-client');

//Pages
import NotFoundPage from "./Pages/NotFoundPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import WelcomePage from "./Pages/WelcomePage";
import InputPage from "./Pages/InputPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { ProcessedDataBucketProvider } from "./ProcessedDataBucketContext";

function App() {
  const darkTheme = createTheme({
    // Theme settings
    palette: {
      mode: "dark",
      background: {
        paper: "#101515",
      },
      text: {
        // primary: "#edf8f3",
        // secondary: "#acd3bf",
      },
      red_alliance: "#ec2e63",
      blue_alliance: "#2d74eb",
    },
    typography: {
      fontSize: 18,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <ProcessedDataBucketProvider>
        <DbProvider>
          <Router>
            <Navigation />
            <div className="App">
              <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/Dashboard" element={<DashboardPage />} />
                <Route path="/Input" element={<InputPage />} />
                <Route path="/404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </Router>
        </DbProvider>
      </ProcessedDataBucketProvider>
    </ThemeProvider>
  );
}

export default App;
