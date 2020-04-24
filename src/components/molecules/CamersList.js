import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {server, camersCount} from "../../config";
import {getImagesFromCamera} from "../../router"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));


class CamerasList extends React.Component {
    constructor(props) {
        super(props);
        this.handleListItemClick = this.handleListItemClick.bind(this)
    }

    handleListItemClick(event, index) {
        this.props.onCameraChange(index);
        console.log("Кликнули на камеру ", index);
    }

    render() {
              // const classes = useStyles();

        let camerasMenu = [];
        for (let i = 1; i < camersCount + 1; i++) {
            camerasMenu.push(
                <ListItem
                    button key={i}
                    onClick={(event) => this.handleListItemClick(event, i)}
                >

                    Camera {i}
                </ListItem>
            )
        }
        return (
            <div className="root">
                <List component="nav" aria-label="main mailbox folders" subheader="Список камер">
                    {camerasMenu}
                </List>

            </div>
        );
    }


}

export default CamerasList
