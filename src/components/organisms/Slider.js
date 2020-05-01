import React from 'react';
import ImageView from '../molecules/ImageView'
import ImageInfo from "../molecules/ImageInfo"
import CamerasList from "../molecules/CamersList"
import {getImagesFromCamera, getInfoImage} from "../../router";
import "./style.css"
import {camersCount} from "../../config"


class Slider extends React.Component {
    startCameraId = 1

    constructor(props) {
        super(props);

        let lastSeenedImageForEachCameras = []
        for (let i=1; i<camersCount+1; i++) {
            lastSeenedImageForEachCameras.push({'cameraId': i, 'active': 0})
        }

        this.state = {
            imagesList: [],
            imageInfo: {},
            lastSeenedImageForEachCameras: lastSeenedImageForEachCameras,
            lastCamera: this.startCameraId
        };

        console.log(this.state.lastSeenedImageForEachCameras)
        this.handleCameraChange = this.handleCameraChange.bind(this);
        this.updateStateByImagesFromCamera = this.updateStateByImagesFromCamera.bind(this);
        this.updateStateByInfo = this.updateStateByInfo.bind(this);

    }

    async componentDidMount() {
        await this.updateStateByImagesFromCamera(this.startCameraId)
        await this.updateStateByInfo(this.state.imagesList[0])
    }

    async handleCameraChange(cameraId) {
        console.log("Делаем запрос из организма к ", cameraId)
        await this.updateStateByImagesFromCamera(cameraId)
        const lastImageSrc = this.state.imagesList[this.state.lastSeenedImageForEachCameras[cameraId]]

        console.log(this.state.lastSeenedImageForEachCameras)
        await this.updateStateByInfo(lastImageSrc)
        this.setState({lastCamera: cameraId})

    }

    async updateStateByImagesFromCamera(cameraId) {
        const imagesList = await getImagesFromCamera(cameraId);
        this.setState({imagesList: imagesList})
    }



    async updateStateByInfo(src, lastActiveImage) {
        function indexOfCamera(cameraId, block) {
            let i=0;
            for (let field of block) {
                if (field.cameraId == cameraId) {
                    return i;
                }
                i++;
            }
        }

        const newState = this.state.lastSeenedImageForEachCameras;
        const indexOfLastCamera = indexOfCamera(this.state.lastCamera, newState)

        newState[indexOfLastCamera].active = lastActiveImage


        this.setState((prevState, props) => (
        {
            lastSeenedImageForEachCameras: newState
        }
        ))

        console.log(indexOfLastCamera)
        console.log(this.state.lastSeenedImageForEachCameras)


        const imageInfo = await getInfoImage(src);
        this.setState({imageInfo: imageInfo});
        console.log("Обновлена инфа по изображению ", src)
    }

    render() {
        return (
            <div className="slider">
                <CamerasList onCameraChange={this.handleCameraChange}/> {/* меняет значение выбранной камеры*/}
                <ImageView images={this.state.imagesList} updateStateByInfo={this.updateStateByInfo}> </ImageView>
                <ImageInfo
                    info={this.state.imageInfo}> </ImageInfo>
            </div>
        );
    }
}


export default Slider;