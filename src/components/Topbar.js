import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    toolbar: {
        marginRight: theme.spacing(2),
    },
}));

export default function Topbar(props) {
    const {title, onSidebarOpen} = props;

    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar position="static" className={classes.toolbar}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={onSidebarOpen}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <IconButton
                        aria-label="show more"
                        aria-haspopup="true"
                        color="inherit"
                        onClick={() => alert("Login In")}
                    >
                        <AccountCircle/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

Topbar.propTypes = {
    title: PropTypes.string,
    onSidebarOpen: PropTypes.func
};
