import React from 'react';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import * as icons from '@material-ui/icons';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import PersonIcon from '@material-ui/icons/Person';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import {server, camersCount} from "../../config";

const colorForCameras = ['blue', 'red', 'orange', 'purple', 'green']



const styles = {
    root: {
        width: '100%',
        maxWidth: 360,
    },
    numberOfCam: {
        display: 'flex',

    }
};


class ImageInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { openState: false };
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState( (prevOpen, props) => ({
            openState: !prevOpen.openState
        }))
    }

    render() {
        const data = this.props.info;
        const {classes} = this.props;
        console.log(data)
        let objectListItems = [];
        const detectionsImages = {
            'car': {'icon': <DirectionsCar />, 'title': 'Автомобиль' },
            'person':{'icon':  <PersonIcon/>, 'title': 'Человек' },
        }

        if (data.objects) {
            for(let object of data.objects) {
                objectListItems.push(<ListItem button onClick={this.handleClick}>
                    <ListItemIcon> {detectionsImages[object.typesOfObject].icon}</ListItemIcon>
                    <ListItemText primary={detectionsImages[object.typesOfObject].title} /> {this.state.openState ? <ExpandLess /> : <ExpandMore />}
                </ListItem>)

                objectListItems.push(<Collapse in={this.state.openState} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem className={classes.nested}>
                            {/*<ListItemText> Идентификатор объекта: {object.id} </ListItemText>*/}
                            <ListItemText> Степень уверенности: {object.scores * 100}% </ListItemText>
                        </ListItem>
                    </List>
                </Collapse>)
            }
        }

        return (
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders" subheader="Информация о кадре">
                    <ListItem> {data.filename}  </ListItem>
                    <ListItem style={{color: colorForCameras[data.numberOfCam]}}>  {data.numberOfCam} </ListItem>
                    <ListItem> {data.createdAt} </ListItem>
                    <ListItem> {data.fixationDatetime} </ListItem>
                    {objectListItems}
                </List>

            </div>
        );
    }
    }

export default withStyles(styles)(ImageInfo)


