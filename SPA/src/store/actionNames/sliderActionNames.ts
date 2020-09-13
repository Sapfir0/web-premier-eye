
export const GET_IMAGES_FROM_CAMERA = "GET_IMAGES_FROM_CAMERA" as const
export const SET_IMAGES_FROM_CAMERA = "SET_IMAGES_FROM_CAMERA" as const

export const GET_INFO_IMAGE = "GET_INFO_IMAGE" as const
export const SET_INFO_IMAGE = "SET_INFO_IMAGE" as const

const sliderActions = {
    GET_IMAGES_FROM_CAMERA, SET_IMAGES_FROM_CAMERA,
    GET_INFO_IMAGE, SET_INFO_IMAGE
} as const

export type SLIDER_ACTIONS = typeof sliderActions[keyof typeof sliderActions]
