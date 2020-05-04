import {makeStyles} from "@material-ui/core/styles";
import React from "react";


const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: "40px"
    },

}));


export default function Home(props) {
    const classes = useStyles();
    return (
        <>
            <header className={classes.header}>
                {props.header}
            </header>
            <div className={classes.content}>
                {props.content}
            </div>
            <footer>
                {props.footer}
            </footer>

        </>
    )
}
