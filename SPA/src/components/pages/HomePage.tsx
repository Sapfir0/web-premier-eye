import React from "react";
import Home from "../templates/Home";
import Slider from "../Slider/Slider";
import ButtonAppBar from "../RoutedHeader/Header";
import SliderContainer from "../Slider/SliderContainer";


export default function HomePage() {
    return (
        <>
        <Home
            header={ButtonAppBar()}
            content={<SliderContainer/>}
        />
        </>

    )
}



