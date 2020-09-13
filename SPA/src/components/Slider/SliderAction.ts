import {injectable} from "inversify";
import {ActionTypePayload, IdPayload} from "../../typings/common";
import {
    GET_IMAGES_FROM_CAMERA, GET_INFO_IMAGE,
    SET_IMAGES_FROM_CAMERA, SET_INFO_IMAGE,
    SLIDER_ACTIONS
} from "../../store/actionNames/sliderActionNames";
import {ImagesInfoPayload, ImagesUrlPayload, SrcPayload} from "../../typings/sliderTypes";
import {ISliderPrivateAction, ISliderPublicAction} from "../../typings/IAction";
import {IImageInfo} from "../ImageInfo/IImageInfo";


@injectable()
export default class SliderAction implements ISliderPrivateAction, ISliderPublicAction {

    public getImagesFromCamera = (cameraId: string): ActionTypePayload<IdPayload, SLIDER_ACTIONS> => ({
        type: GET_IMAGES_FROM_CAMERA,
        payload: {
            id: cameraId
        }
    })

    public setImagesFromCamera = (imagesUrl: string[]): ActionTypePayload<ImagesUrlPayload, SLIDER_ACTIONS> => ({
        type: SET_IMAGES_FROM_CAMERA,
        payload: {
            imagesUrl
        }
    })

    public getInfoImage = (src: string): ActionTypePayload<SrcPayload, SLIDER_ACTIONS> => ({
        type: GET_INFO_IMAGE,
        payload: {
            src
        }
    })

    public setInfoImage = (imageInfo: IImageInfo): ActionTypePayload<ImagesInfoPayload, SLIDER_ACTIONS> => ({
        type: SET_INFO_IMAGE,
        payload: {
            imageInfo
        }
    })




}