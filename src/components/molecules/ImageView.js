import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {getSrcByImageName} from "../../router";
import {withStyles} from "@material-ui/core/styles";
import NotFoundImage from "../atoms/NotFoundImage";


const styles = {
    imageView: {
        maxWidth: 400,
        flexGrow: 1,
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
        // paddingLeft: theme.spacing(4),
        // backgroundColor: theme.palette.background.default,
    },
    img: {
        height: 255,
        display: 'block',
        maxWidth: 400,
        overflow: 'hidden',
        width: '100%',

        backgroundColor: 'red',
        color: 'white',
    },

}

class ImageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeStep: 0}

        this.handleBack = this.handleBack.bind(this)
        this.handleNext = this.handleNext.bind(this)
    }

    handleNext = () => { // для кнопок
        this.handleStepChange(this.state.activeStep+1)
    };

    handleBack = () => { // для кнопок
        this.handleStepChange(this.state.activeStep-1)

    };

    handleStepChange = (step) => {
        this.setState({activeStep: step}, () => {
            this.props.updateStateByInfo(this.props.images[this.state.activeStep], this.state.activeStep)
        })
    };

    render() {
        const images = this.props.images;
        const maxSteps = images.length;
        const {classes} = this.props;

        const activeStep = this.state.activeStep

        let slideBlock;
        if(images.hasOwnProperty("error")) {
            slideBlock = <NotFoundImage />
        }
        else {
            slideBlock = <> <SwipeableViews
                index={activeStep}
                onChangeIndex={this.handleStepChange}
                enableMouseEvents
            >
                {images.map((step, index) => (
                    <div key={step}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <img className={classes.img} src={getSrcByImageName(step)} alt={step}/>
                        ) : null}
                    </div>
                ))}
            </SwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="progress"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        <KeyboardArrowLeft/>
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowRight/>
                        Back
                    </Button>
                }
            />
            </>
        }

        return (
            <div className={classes.imageView}>
                {slideBlock}
            </div>
        );
    }


}

export default withStyles(styles)(ImageView);
