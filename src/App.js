import React from 'react';
import HomePage from "./components/pages/HomePage"
import Settings from "./components/pages/Settings";
import ButtonAppBar from "./components/organisms/Header";

import "./App.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


function App() {
    return (
        <Router>
            <HomePage />
        </Router>
    );
}

export default App;
