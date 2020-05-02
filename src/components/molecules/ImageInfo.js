import React, { Component } from "react";
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import PersonIcon from '@material-ui/icons/Person';
import {
    List,
    ListItem,
    ListItemText,
    Divider,
    Collapse
} from "@material-ui/core";


function getSettings(countOfObjects) {
    let state =  [];
    for(let i=1; i<countOfObjects+1;i++) {
        state.push({id: i, open: false})
    }
    return state;
}


// const myData = {
//     createdAt: "Mon, 25 Nov 2019 20:48:35 GMT",
//     filename: "1_20190718144434.jpg",
//     fixationDatetime: "Thu, 18 Jul 2019 14:44:34 GMT",
//     hasObjects: true,
//     id: 21,
//     numberOfCam: 3,
//     objects: [
//         {
//             coordinatesId: 34,
//             createdAt: "Mon, 25 Nov 2019 20:48:35 GMT",
//             id: 1,
//             imageId: 21,
//             scores: 99.8,
//             typesOfObject: "car",
//             updatedAt: "Mon, 25 Nov 2019 20:48:35 GMT"
//         },
//         {
//             coordinatesId: 34,
//             createdAt: "Mon, 25 Nov 2019 20:48:35 GMT",
//             id: 2,
//             imageId: 21,
//             scores: 98.1,
//             typesOfObject: "car",
//             updatedAt: "Mon, 25 Nov 2019 20:48:35 GMT"
//         }
//     ],
//     path: "",
//     updatedAt: "Mon, 25 Nov 2019 20:48:35 GMT"
// };

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
                                <ListItemText inset primary={each.nameHeader} />
                                {console.log(this.state.settings, each ) }
                                {this.state.settings.find(item => item.id === each.id).open ? "expanded" : "collapsed"}
                            </ListItem>
                            <Divider />
                            <Collapse
                                in={this.state.settings.find(item => item.id === each.id).open}
                                timeout="auto"
                                unmountOnExit
                            >
                                <List component="div" disablePadding>
                                    <ListItem> {each.scores} </ListItem>

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

        return (
            <div style={{ marginRight: "15px" }}>
                {objects}
            </div>
        );
    }
}
export default ImageInfo;
