import {makeStyles} from "@material-ui/core/styles";
import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import Button from "@material-ui/core/Button";
import SettingsIcon from "@material-ui/icons/Settings";


const useStyles = makeStyles((theme) => ({
    content: {
        marginTop: "40px"
    },
    header: {

    }

}));


export default function Home(props: { header: React.ReactNode; content: React.ReactNode; }) {
    const classes = useStyles();
    return (
        <>
            <header className={classes.header}>
                {props.header}
            </header>
            <Switch>
                <Route path="/settings">
                    <div> TODO</div>
                </Route>
                <Route path="/">
                    <div className={classes.content}>
                        {props.content}
                    </div>
                </Route>
            </Switch>

        </>
    )
}
