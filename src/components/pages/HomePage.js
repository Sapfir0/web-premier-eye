import React from "react";
import ButtonAppBar from "../organisms/Header";
import Home from "../templates/Home";
import Slider from "../organisms/Slider";
import Footer from "../organisms/Footer";


export default function HomePage() {
    return (
        <Home
            header={ButtonAppBar()}
            content={<Slider/>}
            footer={Footer()}
        />
    )
}



