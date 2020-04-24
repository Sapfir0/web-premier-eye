import React from 'react';
import Slide from '../molecules/Slide'
import ImageInfo from "../molecules/ImageInfo"
import CamerasList from "../molecules/CamersList"
import {getImagesFromCamera } from "../../router";

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imagesList: [] };
    }

    componentDidMount() {
        getImagesFromCamera(1).then(res => {
            this.setState({imagesList: res})
            console.log(res)
        })
    }

    handleCameraChange(cameraId) {
        getImagesFromCamera(cameraId).then(res => {
            this.setState({imagesList: res})
            console.log(res)
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
