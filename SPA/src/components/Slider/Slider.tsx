import React from 'react';
import ImageView from '../ImageView/ImageView'
import ImageInfo from "../ImageInfo/ImageInfo"
import CamerasList from "../CamerasList/CamerasList"
import {withStyles} from '@material-ui/core/styles';
import {IImageInfo} from "../ImageInfo/IImageInfo";
import {ISliderPublicAction} from "../../typings/IAction";
import "./Slider.pcss"

export interface ISlider {

    imagesList: Array<string>,
    imageInfo: IImageInfo | null
    actions: ISliderPublicAction
}


class Slider extends React.Component<ISlider> {
    startCameraId = 1

    constructor(props: ISlider) {
        super(props);
    }

    async componentDidMount() {
        await this.updateStateByImagesFromCamera(this.startCameraId)
        //await this.updateStateByInfo(this.state.imagesList[0])
    }

    handleCameraChange = async (cameraId: number) => {
        await this.updateStateByImagesFromCamera(cameraId)
        await this.updateStateByInfo(this.props.imagesList[0])
    }

     updateStateByImagesFromCamera = async (cameraId: number) => {
        this.props.actions.getImagesFromCamera(cameraId)
    }

    updateStateByInfo = async (src: string) => {
        //const imageInfo = await getInfoImage(src);
        //this.setState({imageInfo: imageInfo});
        this.props.actions.getInfoImage(src)
        console.log("Обновлена инфа по изображению ", src)
    }

    render() {

        return (
            <div className="slider">
                <CamerasList onCameraChange={this.handleCameraChange}/>
                {
                    this.props.imagesList &&
                    <ImageView images={this.props.imagesList} updateStateByInfo={this.updateStateByInfo}> </ImageView>

                }
                {/*<ImageInfo*/}
                {/*    info={this.props.imageInfo}> </ImageInfo>*/}
            </div>
        );
    }
}


export default Slider;
