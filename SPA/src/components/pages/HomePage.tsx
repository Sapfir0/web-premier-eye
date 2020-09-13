import React from "react";
import Home from "../templates/Home";
import Slider from "../Slider/Slider";
import Footer from "../organisms/Footer";
import RoutedHeader from "../RoutedHeader/RoutedHeader";
import ButtonAppBar from "../RoutedHeader/Header";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";
import Toolbar from "@material-ui/core/Toolbar";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

export default function HomePage() {
    return (
        <>
        <Home
            header={ButtonAppBar()}
            content={<Slider/>}
            footer={Footer()}
        />
        </>

    )
}



