import React from 'react';
import ImageView from '../molecules/ImageView/ImageView'
import ImageInfo from "../molecules/ImageInfo/ImageInfo"
import CamerasList from "../molecules/CamerasList/CamerasList"
import {getImagesFromCamera, getInfoImage} from "../../router";
import {camersCount} from "../../config"
import {withStyles} from '@material-ui/core/styles';
import {IImageInfo} from "../molecules/ImageInfo/IImageInfo";

const styles = {
    root: {
        display: 'flex',
    },
};


interface IProps {
    classes: any
}

interface IState {
    imagesList: Array<any>,
    imageInfo: IImageInfo
}

class Slider extends React.Component<IProps, IState> {
    startCameraId = 1

    constructor(props: IProps) {
        super(props);

        this.state = {
            imagesList: [],
            imageInfo: {numberOfCam: -1, filename: "", createdAt: new Date(), fixationDatetime: new Date(), objects: []},
        };
    }

    async componentDidMount() {
        await this.updateStateByImagesFromCamera(this.startCameraId)
        await this.updateStateByInfo(this.state.imagesList[0])
    }

    handleCameraChange = async (cameraId: number) => {
        console.log("Делаем запрос из организма к ", cameraId)
        await this.updateStateByImagesFromCamera(cameraId)
        await this.updateStateByInfo(this.state.imagesList[0])
    }

     updateStateByImagesFromCamera = async (cameraId: number) => {
        const imagesList = await getImagesFromCamera(cameraId);
        this.setState({imagesList: imagesList})
    }

    updateStateByInfo = async (src: string) => {
        const imageInfo = await getInfoImage(src);
        this.setState({imageInfo: imageInfo});
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
