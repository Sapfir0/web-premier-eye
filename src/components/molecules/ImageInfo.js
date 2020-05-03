import React from "react";
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import PersonIcon from '@material-ui/icons/Person';
import {Collapse, Divider, List, ListItem, ListItemText} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import WarningIcon from '@material-ui/icons/Warning';
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles, withStyles} from '@material-ui/core/styles';

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


function getSettings(countOfObjects) {
    let state =  [];
    for(let i=1; i<countOfObjects+1;i++) {
        state.push({id: i, open: false})
    }
    return state;
}

function getDiffSecond(date1, date2) {
    return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / 1000);
}


class ImageInfo extends React.Component {

    constructor(props) {
        super(props)

        this.state = {settings: getSettings(10) };
    }

    handleClick = id => {
        this.setState(state => ({
            ...state,
            settings: state.settings.map(item =>
                item.id === id ? { ...item, open: !item.open } : item
            )
        }));

    };


    render() {
        let objects = [];
        const myData = this.props.info
        const detectionsImages = {
            'car': {'icon': <DirectionsCar />, 'title': 'Автомобиль' },
            'person':{'icon':  <PersonIcon/>, 'title': 'Человек' },
        }


        if(myData.objects) {
            if (!this.state.settings) {
                this.setState(
                    {settings: getSettings(myData.objects.length)}
                )
            }

            for(let i=0; i<myData.objects.length; i++) {
                myData.objects[i].id = i+1
            }
            try {
                objects = <List component="nav">
                    {myData.objects.map(each => (
                        <React.Fragment key={each.id}>
                            <ListItem button onClick={() => this.handleClick(each.id)}>
                                <ListItemIcon>{detectionsImages[each.typesOfObject].icon} </ListItemIcon>
                                <ListItemText inset primary={detectionsImages[each.typesOfObject].title} />

                                {/*{this.state.settings.find(item => item.id === each.id).open ? each.typesOfObject  : "collapsed"}*/}
                            </ListItem>
                            <Divider />
                            <Collapse
                                in={this.state.settings.find(item => item.id === each.id).open}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    <ListItem> Степень уверенности: {each.scores * 100}%  </ListItem>
                                </List>
                            </Collapse>
                        </React.Fragment>
                    ))}
                </List>
            }
            catch (e) {
                console.warn("Что-то сломалось", e)
            }
        }

       const maxDiffBetweenWritingAndFixationDatetime = 60*60
       const bigDateDiff = getDiffSecond(new Date(myData.createdAt), new Date(myData.fixationDatetime)) > maxDiffBetweenWritingAndFixationDatetime
        let warningDateDiff;
        if (bigDateDiff) {
            const longText = "Запись в базе данных появилась " + myData.createdAt + "."
            warningDateDiff = <Tooltip title={longText} aria-label="add">
                <WarningIcon  style={{ color: "orange"}} />
            </Tooltip>
        }


        return (
            <div style={{ marginRight: "15px" }}>
                <List component="nav" aria-label="main mailbox folders" subheader="Информация о кадре">

                    <Tooltip title="Номер камеры" aria-label="add">
                <ListItem style={{ color: colorForCameras[myData.numberOfCam]}}>  {myData.numberOfCam} </ListItem>
                    </Tooltip>
                <ListItem> {myData.filename} </ListItem>
                <ListItem> {myData.fixationDatetime} {warningDateDiff}</ListItem>



                {objects}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(ImageInfo)
