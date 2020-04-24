import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import {getSrcByImageName} from "../../router";
import {withStyles} from "@material-ui/core/styles";


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
    },
}

class ImageView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {activeStep:0}
        const {classes} = this.props;

        this.handleBack = this.handleBack.bind(this)
        this.handleNext = this.handleNext.bind(this)

    }

    handleNext = () => {
        this.setState({activeStep: this.state.activeStep+1}, () => {
            this.props.updateStateByInfo(this.props.images[this.state.activeStep])
        })

    };

    handleBack = () => {
        this.setState({activeStep: this.state.activeStep-1}, () => {
            this.props.updateStateByInfo(this.props.images[this.state.activeStep])
        })
    };

    handleStepChange = (step) => {
        console.log(step, "is a step")
    };

    render() {
        const images = this.props.images;
        const maxSteps = images.length;

        return (
            <div className={styles.imageView}>
                <SwipeableViews
                    index={this.state.activeStep}
                    onChangeIndex={this.handleStepChange}
                    enableMouseEvents
                >
                    {images.map((step, index) => (
                        <div key={step}>
                            {Math.abs(this.state.activeStep - index) <= 2 ? (
                                <img className={styles.img} src={getSrcByImageName(step)} alt={step}/>
                            ) : null}
                        </div>
                    ))}
                </SwipeableViews>
                <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="progress"
                    activeStep={this.state.activeStep}
                    nextButton={
                        <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep === maxSteps - 1}>
                            Next
                             <KeyboardArrowLeft/>
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                            <KeyboardArrowRight/>
                            Back
                        </Button>
                    }
                />
            </div>
        );
    }


}

export default withStyles(styles)(ImageView);
