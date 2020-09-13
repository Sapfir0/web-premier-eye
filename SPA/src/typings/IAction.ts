import {ActionTypePayload, IdPayload} from "./common";
import {SLIDER_ACTIONS} from "../store/actionNames/sliderActionNames";
import {ImagesInfoPayload, ImagesUrlPayload, SrcPayload} from "./sliderTypes";
import {IImageInfo} from "../components/ImageInfo/IImageInfo";


export interface ISliderPublicAction {
    getImagesFromCamera: (cameraId: string) => ActionTypePayload<IdPayload, SLIDER_ACTIONS>
    getInfoImage: (src: string) => ActionTypePayload<SrcPayload, SLIDER_ACTIONS>
}


export interface ISliderPrivateAction {
    setImagesFromCamera: (imagesUrl: string[]) => ActionTypePayload<ImagesUrlPayload, SLIDER_ACTIONS>
    setInfoImage: (imageInfo: IImageInfo) => ActionTypePayload<ImagesInfoPayload, SLIDER_ACTIONS>
}