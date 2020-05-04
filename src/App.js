import React from 'react';
import HomePage from "./components/pages/HomePage"


import "./App.css"
import {
    BrowserRouter as Router,
} from "react-router-dom";


function App() {
    return (
        <Router>
            <HomePage />
        </Router>
    );
}

export default App;
