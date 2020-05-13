import { server } from "./config";

async function fetchTo(url: string) {
    const response = await fetch(server + url);
    const { status } = response;
    if (status === 404) {
        const { statusText } = response;
        console.log('Статус', statusText);
    }
    return response.json();
}


export async function getInfoImage(imageName: string) {
    return fetchTo(`gallery/${imageName}/info`)
}

export async function getImagesFromCamera(cameraId: number) {
    return fetchTo(`gallery/camera/${cameraId}`)
}

export function getSrcByImageName(imageName: string) {
    return `${server}gallery/${imageName}`;
}
