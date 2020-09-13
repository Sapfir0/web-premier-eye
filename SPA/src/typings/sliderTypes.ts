import {IImageInfo} from "../components/ImageInfo/IImageInfo";

export type ImagesUrlPayload = {
    imagesUrl: string[]
}

export type ImagesInfoPayload = {
    imageInfo: IImageInfo
}

export type SrcPayload = {
    src: string
}

export type SliderBasePayload = ImagesInfoPayload & ImagesUrlPayload

export type SliderStore = {
    imageInfo: IImageInfo | null
    imagesList: Array<string>
}