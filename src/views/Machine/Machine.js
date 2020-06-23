import React, {Fragment, useEffect} from 'react';
// import SearchInput from "../../components/SearchInput";
// import {Link} from "react-router-dom";
// import Alert from "@material-ui/lab/Alert";
// import AlertTitle from "@material-ui/lab/AlertTitle";
// import FlagIcon from "@material-ui/icons/Flag";
// import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
// import BuildIcon from "@material-ui/icons/Build";
// import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InfoIcon from "@material-ui/icons/Info";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import {Query, useQuery} from "react-apollo";
import {gql, loader} from "graphql.macro";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {store} from "../../store";
import SpeedDialogs from "./components/SpeedDialogs"
import DetailsStopTimeList from "./components/DetailsStopTimeList";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import Typography from "@material-ui/core/Typography";
import CrashAlert from "./components/CrashAlert"
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import FlagIcon from '@material-ui/icons/Flag';
import Paper from "@material-ui/core/Paper";
import Alert from "@material-ui/lab/Alert";
import AlertTitle from "@material-ui/lab/AlertTitle";
import CrashDialogEdit from "./components/CrashDialogEdit/CrashDialogEdit";

const MACHINE_QUERY = loader('./Graphql/MACHINE_QUERY.graphql');

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    content: {
        marginTop: theme.spacing(0)
    },
    // alert: {
    //     marginBottom: theme.spacing(2),
        // color: '#fff',
        // backgroundColor: '#ff9800',

        // color: '#f44336',
        // color: '#2196f3',
        // color: '#4caf50'

    // },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    list: {
        paddingLeft: theme.spacing(0),
    },

}));


function ListDay(props) {
    const {day} = props;
    let formatter = new Intl.DateTimeFormat("ru", {
        day: "numeric",
        year: "numeric",
        weekday: "long",
        month: "long"
    });
    return (
        <ListSubheader component="div" id="nested-list-subheader">
            {formatter.format(new Date(day))}
        </ListSubheader>
    )
}

ListDay.propTypes = {
    day: PropTypes.string,
};


function ListDayInfoStopList(props) {
    const {id, counter, totalLength} = props;
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
        console.log('click')
    };

    return (
        <Fragment>
            <DetailsStopTimeList open={open} handleClose={handleClose}/>
            <ListItem key={id} button className={classes.list}
                // component={Link}
                // to={`#`}
                      onClick={handleClickOpen}
            >
                <Grid container
                      spacing={2}
                      direction="row"
                      justify="space-between"
                      alignItems="center">
                    <Grid item xs={1}>

                    </Grid>
                    <Grid item xs={8}>
                        <ListItemText primary={`Простои: ${counter}`} secondary="шт."/>
                    </Grid>
                    <Grid item xs={3}>
                        {/*<ListItemText primary={`На ${totalLength} ч.`} secondary=""/>*/}
                        <ListItemText primary={totalLength.toFixed(1)} secondary="час."/>
                    </Grid>
                </Grid>
            </ListItem>
        </Fragment>

    )
}

ListDayInfoStopList.propTypes = {
    id: PropTypes.string,
    counter: PropTypes.number,
    totalLength: PropTypes.number,
};

function ListDayInfoCrashList(props) {
    const {id, counter, totalLength} = props;
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
        console.log('click')
    };

    return (
        <Fragment>
            <DetailsStopTimeList open={open} handleClose={handleClose}/>
            <ListItem key={id} button className={classes.list}
                // component={Link}
                // to={`#`}
                      onClick={handleClickOpen}
            >
                <Grid container
                      spacing={2}
                      direction="row"
                      justify="space-between"
                      alignItems="center">
                    <Grid item xs={1}>

                    </Grid>
                    <Grid item xs={8}>
                        <ListItemText primary={`Ремонты: ${counter}`} secondary="шт."/>
                    </Grid>
                    <Grid item xs={3}>
                        {/*<ListItemText primary={`На ${totalLength} ч.`} secondary=""/>*/}
                        <ListItemText primary={totalLength.toFixed(1)} secondary="час."/>
                    </Grid>
                </Grid>
            </ListItem>
        </Fragment>

    )
}

ListDayInfoCrashList.propTypes = {
    id: PropTypes.string,
    counter: PropTypes.number,
    totalLength: PropTypes.number,
};

function ListDayInfoToDoList(props) {
    const {id, counter} = props;
    const classes = useStyles();

    const handleClick = () => {
        console.log('click')
    };

    return (
        <ListItem key={id} button className={classes.list} component={Link}
            // to={`#`}
                  onClick={handleClick}
        >
            <Grid container
                  spacing={2}
                  direction="row"
                  justify="space-between"
                  alignItems="center">
                <Grid item xs={1}>

                </Grid>
                <Grid item xs={8}>
                    <ListItemText primary={`Заметок: ${counter}`} secondary="шт."/>
                </Grid>
                <Grid item xs={3}>
                    {/*<ListItemText primary={`На ${totalLength} ч.`} secondary=""/>*/}
                    {/*<ListItemText primary={totalLength} secondary="час."/>*/}
                </Grid>
            </Grid>
        </ListItem>
    )
}

ListDayInfoToDoList.propTypes = {
    id: PropTypes.string,
    counter: PropTypes.number,
};

function ListDayInfoKMV(props) {
    const {id, kmv, totalLength} = props;
    const classes = useStyles();

    return (
        <ListItem key={id} button className={classes.list} component={Link}
                  to={`/machine/${id}`}>
            <Grid container
                  spacing={2}
                  direction="row"
                  justify="space-between"
                  alignItems="center">
                <Grid item xs={1}>
                    {kmv < 0.2 &&
                    < ListItemIcon>
                        < InfoIcon fontSize="small" color={"secondary"}/>
                    </ListItemIcon>
                    }


                </Grid>
                <Grid item xs={8}>
                    <ListItemText primary={`Выпуск: ${totalLength}`} secondary="м."/>
                </Grid>
                <Grid item xs={3}>
                    <ListItemText primary={`${kmv * 100}`} secondary="КМВ, %"/>
                </Grid>
            </Grid>
        </ListItem>
    )
}

ListDayInfoKMV.propTypes = {
    id: PropTypes.string,
    kmv: PropTypes.number,
    totalLength: PropTypes.number,
};


function Machine(props) {
    const {id} = props.match.params;
    // const [name, setName] = React.useState('');
    const classes = useStyles();
    const {loading, error, data, refetch} = useQuery(MACHINE_QUERY, {
        variables: {"pk": id},
        pollInterval: 5000,
    });
    if (loading) return (<Loading/>);
    if (error) return (<Error/>);

    // useEffect(() => {
    //     // Обновляем заголовок документа, используя API браузера
    //     // store.dispatch({type:'SET_TITLE', text:`Оборудование #${id}`})
    // });

    // const handleSetTitle = (text) => {
    //     store.dispatch({type: 'SET_TITLE', text: text})
    // };
    const handleUpdateMachine = () => {
        refetch().then(r => {
        })
    };

    store.dispatch({type: 'SET_TITLE', text: data.machine.name});
    return (
        <div className={classes.root}>
            <div className={classes.content}>
                {data.machine.days
                    .map((day)=>(
                        day.crashListInMachine.map(crash=>(
                            crash.timeStop == null &&
                            <CrashAlert
                                key={crash.id}
                                services={crash.services.map(service=>service.name)}
                                text={crash.text}
                                crashId={crash.id}
                                handleUpdateMachine={handleUpdateMachine}
                            />
                        ))
                    ))
                }
                {/*<CrashDialogEdit*/}
                {/*    open={true}*/}
                {/*/>*/}
                <Card>
                    <CardContent>
                        <List component="nav" aria-label="main mailbox folders">
                            <Fragment>
                                {/*{setName(data.machine.name)}*/}
                                {/*{handleSetTitle(data.machine.name)}*/}
                                {data.machine.days
                                    .sort((a, b) => {
                                        if (a.day > b.day) return -1;
                                        if (a.day < b.day) return 1;
                                        return 0;
                                    })
                                    .map((day) => (
                                        <Fragment key={day.id}>
                                            <ListDay day={day.day}/>
                                            {day.valuesInMachine.length > 0 &&
                                            <ListDayInfoKMV id={id}
                                                            kmv={day.valuesInMachine[0].kmv}
                                                            totalLength={day.valuesInMachine[0].totalLength}/>
                                            }

                                            {day.stopTimeListsInMachine.length > 0 &&
                                            <ListDayInfoStopList id={id}
                                                                 counter={day.stopTimeListsInMachine.length}
                                                                 totalLength={day.totalStopTimeListInMachine}/>
                                            }
                                            {day.todoInMachine.length > 0 &&
                                            <ListDayInfoToDoList id={id}
                                                                 counter={day.todoInMachine.length}
                                            />
                                            }
                                            {day.crashListInMachine.length > 0 &&
                                            <ListDayInfoCrashList id={id}
                                                                 counter={day.crashListInMachine.length}
                                                                 totalLength={0}/>
                                            }
                                        </Fragment>

                                    ))
                                }
                            </Fragment>
                        </List>
                    </CardContent>
                </Card>
            </div>
            <SpeedDialogs idMachine={id} nameMachine={data.machine.name} handleUpdateMachine={handleUpdateMachine}/>
        </div>
    );
}

// Machine.propTypes = {
//     id: PropTypes.number
// };

export default Machine;

