import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ButtonAppBar from "../organisms/Header";
import Settings from "./Settings";
import Home from "../templates/Home";
import Slider from "../organisms/Slider";
import Footer from "../organisms/Footer";


export default function HomePage(props) {
    return (
        <Home
            header={ButtonAppBar()}
            content={<Slider/>}
            footer={Footer()}
        />
    )
}



