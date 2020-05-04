import Tooltip from "@material-ui/core/Tooltip";
import React from "react";

const colorForCameras = ['blue', 'red', 'orange', 'purple', 'green']


export default function (props) {
    return(<Tooltip title="Номер камеры" aria-label="add">
        <span style={{color: colorForCameras[props.cameraId]}}> {props.cameraId} </span>
    </Tooltip>)

}