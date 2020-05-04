import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import SettingsIcon from "@material-ui/icons/Settings";
import React from "react";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <Button className={classes.title} variant="h6">
                            Home
                        </Button>
                    </Link>

                    <Link to="/settings">
                        <SettingsIcon color="inherit">Настройки</SettingsIcon>
                    </Link>
                </Toolbar>

            </AppBar>

        </div>
    );
}
