import React from 'react';
import PropTypes from 'prop-types';
// import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link as RouterLink} from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import BuildIcon from '@material-ui/icons/Build';

// import SettingsIcon from '@material-ui/icons/Settings';
// import OfflineBoltIcon from '@material-ui/icons/OfflineBolt';
// import MyLocationIcon from '@material-ui/icons/MyLocation';
import MemoryIcon from '@material-ui/icons/Memory';

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import {loader} from "graphql.macro";
import {useQuery} from "react-apollo";
import Loading from "./Loading/Loading";
import Error from "./Error/Error";

const STTISTIC_QUERY = loader('./Graphql/STATISTIC_QUERY.graphql');

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
}));

function ListItemLink(props) {
    const {icon, primary, to, badgeContent, badgeColor} = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef((itemProps, ref) => (
                // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
                // See https://github.com/ReactTraining/react-router/issues/6056
                <RouterLink to={to} {...itemProps} innerRef={ref}/>
            )),
        [to],
    );
    const  col = "#ff9800";
    return (
        <li>
            <ListItem button component={renderLink}>
                {icon ? <ListItemIcon>
                            <Badge color="primary"  badgeContent={badgeContent}>{icon}</Badge>
                        </ListItemIcon> : null}
                <ListItemText primary={primary}/>
            </ListItem>
        </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.object,
    primary: PropTypes.string,
    to: PropTypes.any,
    badgeContent: PropTypes.number,
    badgeColor: PropTypes.string
};

function Sidebar(props) {
    const {open, onClose} = props;
    const classes = useStyles();
    const theme = useTheme();
    const {loading, error, data, refetch} = useQuery(STTISTIC_QUERY, {
        variables: {},
        pollInterval: 5000,
    });
    if (loading) return (<Loading/>);
    if (error) return (<Error/>);

    return (
        <React.Fragment>
            <Drawer
                className={classes.drawer}
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
                onBackdropClick={onClose}
                onClick={onClose}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={onClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                    </IconButton>
                </div>
                <Divider/>
                <List>
                    <ListItemLink to="/dashboard" primary="Оборудование" icon={<DashboardIcon/>}/>
                    <ListItemLink to="/stoptimelists" primary="Простои" icon={<AccessAlarmIcon/>}/>
                    <ListItemLink to="/crashlists" primary="Ремонты" icon={<BuildIcon/>} badgeContent={data.statistic.crashInWork} />
                </List>
                <Divider/>
                <List>
                    {/*<ListItemLink to="#" primary="Механики" icon={<SettingsIcon/>}/>*/}
                    {/*<ListItemLink to="#" primary="Энергетики" icon={<OfflineBoltIcon/>}/>*/}
                    {/*<ListItemLink to="#" primary="Технологи" icon={<MyLocationIcon/>}/>*/}
                    <ListItemLink to="/todo/1" primary="Электроники" icon={<MemoryIcon/>}/>
                </List>
            </Drawer>
        </React.Fragment>
    );
}

Sidebar.propTypes = {
    // className: PropTypes.string,
    onClose: PropTypes.func,
    open: PropTypes.bool.isRequired,
    // variant: PropTypes.string.isRequired
};

export default Sidebar;
