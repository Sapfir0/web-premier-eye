import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Link, Route, Switch} from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import Button from "@material-ui/core/Button";
import Settings from "../pages/Settings";
import HomePage from "../pages/HomePage";



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        alignItems: "flex-end"
    },
    menuButton: {
        marginRight: theme.spacing(2),
        alignItems: "flex-end"
    },
    title: {
        flexGrow: 1,
        textDecoration: "none",
        color: 'white'
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <Button className={classes.title}>
                            Home
                        </Button>
                    </Link>

                    <Link to="/settings">
                        <SettingsIcon className={classes.menuButton} color="inherit">Настройки</SettingsIcon>
                    </Link>
                </Toolbar>

            </AppBar>

        </div>
    );
}
