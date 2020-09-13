import {ISliderReducer} from "../../typings/IReducers";
import {ImagesUrlPayload, SliderBasePayload, SliderStore} from "../../typings/sliderTypes";
import {ActionTypePayload} from "../../typings/common";
import {SET_IMAGES_FROM_CAMERA, SLIDER_ACTIONS} from "../../store/actionNames/sliderActionNames";
import {sliderStore} from "./SliderStore";
import {injectable} from "inversify";
import {render} from "react-dom";


@injectable()
export default class SliderReducer implements ISliderReducer {
    public getReducer = () => {
        return (state: SliderStore=sliderStore, action: ActionTypePayload<SliderBasePayload, SLIDER_ACTIONS>) =>
            this.reduce(state, action);
    }

    protected setImagesFromCamera(state: SliderStore, payload: ImagesUrlPayload) {
        const newState = {...state}

        newState.imagesList = payload.imagesUrl

        return newState
    }


    protected reduce = (state: SliderStore, action: ActionTypePayload<SliderBasePayload, SLIDER_ACTIONS>): SliderStore => {
        switch (action.type) {
            case SET_IMAGES_FROM_CAMERA:
                return this.setImagesFromCamera(state, action.payload)
            default: {
                return state
            }
        }
    }

}