import React from "react";
import Home from "../templates/Home";
import Slider from "../organisms/Slider";
import Footer from "../organisms/Footer";
import RoutedHeader from "../organisms/RoutedHeader/RoutedHeader";
import ButtonAppBar from "../organisms/RoutedHeader/Header";

export default function HomePage() {
    return (
        <Home
            header={ButtonAppBar()}
            content={<Slider/>}
            footer={Footer()}
        />
    )
}



