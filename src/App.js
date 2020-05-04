import React from 'react';
import Home from "./components/pages/Home"
import Settings from "./components/pages/Settings";
import ButtonAppBar from "./components/organisms/Header";


import "./App.css"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function App() {
    return (
        <>
            <Router>
                <ButtonAppBar/>
                <Switch>
                    <Route path="/">
                        <Home/>
                    </Route>
                    <Route path="/settings">
                        <Settings/>
                    </Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
