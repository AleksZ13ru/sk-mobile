import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import {AUTH_TOKEN} from '../constants'

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

function ElevationScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

// const GET_TITLE = gql`
//     {
//         title @client
//     }
// `;

export default function Topbar(props) {
    const {title, onSidebarOpen} = props;
    const authToken = localStorage.getItem(AUTH_TOKEN);
    const classes = useStyles();
    let history = useHistory();
    // const {data} = useQuery(GET_TITLE);
    return (
        <React.Fragment>
            <CssBaseline/>
            <ElevationScroll {...props}>
                <AppBar>
                    {/*<AppBar position="static" className={classes.toolbar}>*/}
                    <Toolbar>
                        {window.location.pathname === '/dashboard' ?
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                onClick={onSidebarOpen}
                            >
                                <MenuIcon/>
                            </IconButton>
                            :
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="menu"
                                // onClick={() => history.push('/dashboard')}
                                onClick={() => history.goBack()}
                            >
                                <ChevronLeftIcon/>
                            </IconButton>
                        }

                        <Typography variant="h6" className={classes.title} noWrap>
                            {/*{title}*/}
                            {title}
                        </Typography>
                        {authToken ? (<IconButton
                                aria-label="show more"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={() => {
                                    localStorage.removeItem(AUTH_TOKEN);
                                    history.push(`/`)
                                }}
                            >
                                <MeetingRoomIcon/>
                            </IconButton>
                        ) : (
                            <IconButton
                                aria-label="show more"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={() => history.push('/sign-in')}
                            >
                                <AccountCircle/>
                            </IconButton>
                        )}

                    </Toolbar>
                </AppBar>
            </ElevationScroll>
        </React.Fragment>
    );
}

Topbar.propTypes = {
    title: PropTypes.string,
    onSidebarOpen: PropTypes.func
};
