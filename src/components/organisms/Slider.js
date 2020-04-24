import React from 'react';
import ImageView from '../molecules/ImageView'
import ImageInfo from "../molecules/ImageInfo"
import CamerasList from "../molecules/CamersList"
import {getImagesFromCamera, getInfoImage} from "../../router";
import "./style.css"

class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {imagesList: [], imageInfo: {}};

        this.handleCameraChange = this.handleCameraChange.bind(this);
        this.updateStateByImagesFromCamera = this.updateStateByImagesFromCamera.bind(this);
        this.updateStateByInfo = this.updateStateByInfo.bind(this);

    }

    componentDidMount() {
        this.updateStateByImagesFromCamera(1)
    }

    handleCameraChange(cameraId) {
        console.log("Делаем запрос из организма к ", cameraId)
        this.updateStateByImagesFromCamera(cameraId)
    }

    async updateStateByImagesFromCamera(cameraId) {
        const imagesList = await getImagesFromCamera(cameraId);
        this.setState({imagesList: imagesList})
    }

    async updateStateByInfo(src) {
        const imageInfo = await getInfoImage(src);
        this.setState({imageInfo: imageInfo});
        console.log("Обновлена инфа по изображению ", src)
    }

    render() {
        return (
            <div className="slider">
                <CamerasList onCameraChange={this.handleCameraChange}/> {/* меняет значение выбранной камеры*/}
                <ImageView images={this.state.imagesList}> </ImageView>
                <ImageInfo
                    info={this.state.imageInfo}> </ImageInfo>
            </div>
        );
    }
}


export default Slider;
