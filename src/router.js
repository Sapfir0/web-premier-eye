import { server } from "./config";

async function fetchTo(url) {
    const response = await fetch(server + url);
    const { status } = response;
    if (status === 404) {
        const { statusText } = response;
        console.log('Статус', statusText);
    }
    return response.json();
}


async function getCameras() {
}

async function getInfoImage() {

}

export async function getImagesFromCamera(cameraId) {
    return fetchTo("gallery/camera/" + cameraId)
}

export function getSrcByImageName(imageName) {
    return server + "gallery/" + imageName;
}
