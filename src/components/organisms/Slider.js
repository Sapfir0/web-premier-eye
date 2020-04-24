import React from 'react';
import Slide from '../molecules/Slide'
import ImageInfo from "../molecules/ImageInfo"
import CamerasList from "../molecules/CamersList"
import {getImagesFromCamera } from "../../router";

import "./style.css"
class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imagesList: [] };

        this.handleCameraChange = this.handleCameraChange.bind(this);
        this.abstractFunc = this.abstractFunc.bind(this);

    }

    componentDidMount() {
        this.abstractFunc(1)
    }

    handleCameraChange(cameraId) {
        console.log("Делаем запрос из организма к ", cameraId)
        this.abstractFunc(cameraId)
    }

    abstractFunc(cameraId) {
        getImagesFromCamera(cameraId).then((data) => {
            this.setState({imagesList: data})
        })
    }

    render() {
        return (
            <div className="slider">
                <CamerasList onCameraChange={this.handleCameraChange} /> {/*внутри листа должно происходить событие changeActiveCamera, тут мы должны подписаться на него*/}
                <Slide images={this.state.imagesList}> </Slide>
                <ImageInfo info={this.props.imageInfo}> </ImageInfo> {/*внутри должно происходить событие nameChanged, тут мы должны подписаться на него*/}
            </div>
        );
    }
}



export default Slider;
