import logo from "./logo.svg";
import Navigation from "./components/Navigation/Navigation";
import { DbProvider } from "./DbContext";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
// const Cushion = require('cushiondb-client');

//Pages
import NotFoundPage from "./Pages/NotFoundPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import WelcomePage from "./Pages/WelcomePage";
import InputPage from "./Pages/InputPage";

function App() {
  return (
    <div className="App">
      <DbProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/Dashboard" element={<DashboardPage />} />
            <Route path="/Input" element={<InputPage />} />
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </DbProvider>
    </div>
  );
}

export default App;
