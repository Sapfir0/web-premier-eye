import React from "react";
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import PersonIcon from '@material-ui/icons/Person';
import {Collapse, Divider, List, ListItem, ListItemText} from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import WarningIcon from '@material-ui/icons/Warning';
import Tooltip from "@material-ui/core/Tooltip";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import TitledWarning from "../atoms/TitledWarning";
import TitledCameraNumber from "../atoms/TitledCameraNumber";


const styles = {
    root: {
        marginRight: "15px"
    },
    numberOfCam: {
        display: 'flex',
    }
};

const detectionsImages = {
    'car': {'icon': <DirectionsCar/>, 'title': 'Автомобиль'},
    'person': {'icon': <PersonIcon/>, 'title': 'Человек'},
}

function getSettings(countOfObjects) {
    let state = [];
    for (let i = 1; i < countOfObjects + 1; i++) {
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
        this.state = {settings: getSettings(10)}; // учет максимум 10 объектов на кадре
        this.parseObject = this.parseObject.bind(this)
        this.warningIfBigDiffBetweenDates = this.warningIfBigDiffBetweenDates.bind(this)
    }

    handleClick = id => {
        this.setState(state => ({
            ...state,
            settings: state.settings.map(item =>
                item.id === id ? {...item, open: !item.open} : item
            )
        }));
    };

    parseObject(data) {
        let objects = [];

        if (!this.state.settings) {
            this.setState({
                    settings: getSettings(data.length)
                }
            )
        }

        for (let i = 0; i < data.length; i++) { // фиксим объект, нам было бы удобно, чтобы у него был порядковый номер
            data[i].id = i + 1
        }

        try {
            objects = <List component="nav">
                {data.map(each => (
                    <React.Fragment key={each.id}>
                        <ListItem button onClick={() => this.handleClick(each.id)}>
                            <ListItemIcon>{detectionsImages[each.typesOfObject].icon} </ListItemIcon>
                            <ListItemText inset primary={detectionsImages[each.typesOfObject].title}/>
                        </ListItem>
                        <Divider/>
                        <Collapse
                            in={this.state.settings.find(item => item.id === each.id).open}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                <ListItem> Степень уверенности: {each.scores * 100}% </ListItem>
                            </List>
                        </Collapse>
                    </React.Fragment>
                ))}
            </List>
            return objects
        } catch (e) {
            console.warn("Что-то сломалось", e)
        }
    }

    warningIfBigDiffBetweenDates(createdDate, fixationDate, maxDiff = 60 * 60) {
        const bigDateDiff = getDiffSecond(createdDate, fixationDate) > maxDiff
        let warningDateDiff;
        if (bigDateDiff) {
            const longText = `Запись в базе данных появилась ${createdDate}.`
            warningDateDiff = <TitledWarning text={longText}/>
        }
        return warningDateDiff
    }

    render() {
        const myData = this.props.info
        const {classes} = this.props;

        let objects = []
        if (myData.objects) {
            objects = this.parseObject(myData.objects)
        }

        const warningDateDiff = this.warningIfBigDiffBetweenDates(new Date(myData.createdAt), new Date(myData.fixationDatetime));


        return (
            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders" subheader="Информация о кадре">


                    <ListItem>
                        <TitledCameraNumber cameraId={myData.numberOfCam}/>
                    </ListItem>
                    <ListItem> {myData.filename} </ListItem>
                    <ListItem> {myData.fixationDatetime} {warningDateDiff}</ListItem>

                    {objects}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(ImageInfo)
