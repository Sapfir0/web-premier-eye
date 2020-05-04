import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {server, camersCount} from "../../config";
import {withStyles} from "@material-ui/core/styles";

const styles = {
    root: {
        width: '100%',
        maxWidth: 360,
        //backgroundColor: theme.palette.background.paper,
    },
};


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
        const {classes} = this.props;

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
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders" subheader="Список камер">
                    {camerasMenu}
                </List>
            </div>
        );
    }


}

export default withStyles(styles)(CamerasList)
