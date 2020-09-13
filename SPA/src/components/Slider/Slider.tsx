import React from 'react';
import ImageView from '../ImageView/ImageView'
import ImageInfo from "../ImageInfo/ImageInfo"
import CamerasList from "../CamerasList/CamerasList"
import {withStyles} from '@material-ui/core/styles';
import {IImageInfo} from "../ImageInfo/IImageInfo";
import {ISliderPublicAction} from "../../typings/IAction";

const styles = {
    root: {
        display: 'flex',
    },
};


interface IProps {
    classes: any
    imagesList: Array<any>,
    imageInfo: IImageInfo
    actions: ISliderPublicAction
}


class Slider extends React.Component<IProps> {
    startCameraId = 1

    constructor(props: IProps) {
        super(props);
    }

    async componentDidMount() {
        await this.updateStateByImagesFromCamera(this.startCameraId)
        await this.updateStateByInfo(this.state.imagesList[0])
    }

    handleCameraChange = async (cameraId: number) => {
        await this.updateStateByImagesFromCamera(cameraId)
        await this.updateStateByInfo(this.state.imagesList[0])
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
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <CamerasList onCameraChange={this.handleCameraChange}/> {/* меняет значение выбранной камеры*/}
                <ImageView images={this.state.imagesList} updateStateByInfo={this.updateStateByInfo}> </ImageView>
                <ImageInfo
                    info={this.state.imageInfo}> </ImageInfo>
            </div>
        );
    }
}


export default withStyles(styles)(Slider);
