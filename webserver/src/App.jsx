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
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import { Formik, Field, Form } from 'formik';
import { TextField, Button, Grid, FormRow, Checkbox, Radio, FormControlLabel, FormControl, FormLabel, RadioGroup, IconButton, InputAdornment } from "@material-ui/core";
import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons";
import { ProcessedDataBucketProvider } from "./ProcessedDataBucketContext";



function App() {
  const darkTheme = createMuiTheme({

    // Theme settings
    palette: {
      type: "dark",
    },
    typography: {
      fontSize: 18
    }
  });
  const styles = {
    bigbution: {

    }
  }
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <DbProvider>
          <ProcessedDataBucketProvider>
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
          </ProcessedDataBucketProvider>
        </DbProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
