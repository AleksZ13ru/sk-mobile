import React, {Fragment} from 'react';
// import SearchInput from "../../components/SearchInput";
// import {Link} from "react-router-dom";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import InfoIcon from "@material-ui/icons/Info";
// import Alert from "@material-ui/lab/Alert";
// import AlertTitle from "@material-ui/lab/AlertTitle";
// import FlagIcon from "@material-ui/icons/Flag";
// import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
// import BuildIcon from "@material-ui/icons/Build";
// import Typography from "@material-ui/core/Typography";
// import {Link} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import {useQuery} from "react-apollo";
import {gql, loader} from "graphql.macro";
import PropTypes from "prop-types";
import CrashAlert from "../Machine/components/CrashAlert/CrashAlert";
import Loading from "../../components/Loading/Loading";
import Error from "../../components/Error/Error";
import CrashDialogDetails from "../Machine/components/CrashDialogDetails/CrashDialogDetails";
import {keys} from "@material-ui/core/styles/createBreakpoints";

const CRASH_LIST_ALL_DAY_QUERY = loader('./Graphql/CRASH_LIST_ALL_DAY_QUERY.graphql');
const GET_TITLE = gql`
    {
        title @client
    }
`;

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    content: {
        marginTop: theme.spacing(1)
    },
    alert: {
        marginBottom: theme.spacing(2),
        color: '#fff',
        backgroundColor: '#ff9800'
        // color: '#f44336',
        // color: '#2196f3',
        // color: '#4caf50'

    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    list: {
        paddingLeft: theme.spacing(0),
    }

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

function Lists(props) {
    const {array} = props;
    return (
        array
            .filter((element) => (element.timeStop !== null))
            .map((element) => {
            return (
                <ListDayInfo key={element.id} id={element.id} name={element.machine.name} text={element.text}
                             deltaTime={element.deltaTime}/>
            )
        })
    )
}

Lists.propTypes = {
    array: PropTypes.array
};

function ListDayInfo(props) {
    const {id, name, text, deltaTime} = props;
    const classes = useStyles();
    const [openCrashDialogDetails, setOpenCrashDialogDetails] = React.useState(false);
    const handleCloseCrashDialogEdit = () => {
        setOpenCrashDialogDetails(false);
    };
    const handleClick = () => {
        setOpenCrashDialogDetails(true);
    };
    return (
        <Fragment>
            <CrashDialogDetails
                crashId={id}
                open={openCrashDialogDetails}
                handleClose={handleCloseCrashDialogEdit}
                // handleUpdateMachine={handleUpdateMachine}
            />
            <ListItem key={id} button className={classes.list}
                // component={Link}
                      onClick={handleClick}>
                {/*<ListItem key={id} className={classes.list} component={Link}>*/}
                <Grid container
                      spacing={2}
                      direction="row"
                      justify="space-between"
                      alignItems="center">
                    <Grid item xs={1}>
                        {/*{kmv < 0.2 &&*/}
                        {/*< ListItemIcon>*/}
                        {/*    < InfoIcon fontSize="small" color={"secondary"}/>*/}
                        {/*</ListItemIcon>*/}
                        {/*}*/}
                    </Grid>
                    <Grid item xs={9}>
                        <ListItemText primary={`${name}`} secondary={`${text}`}/>
                    </Grid>
                    <Grid item xs={2}>
                        <ListItemText primary={deltaTime.toFixed(1)} secondary="час."/>
                    </Grid>
                </Grid>
            </ListItem>
        </Fragment>
        // button to={`/stoptimelist/${id}`}

    )
}

ListDayInfo.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    deltaTime: PropTypes.number
};

function CrashLists() {
    // const {id} = props.match.params;
    const classes = useStyles();
    const {client} = useQuery(GET_TITLE);
    const {loading, error, data, refetch} = useQuery(CRASH_LIST_ALL_DAY_QUERY, {
        pollInterval: 5000,
    });
    if (loading) return (<Loading/>);
    if (error) return (<Error/>);

    client.writeData({data: {title: 'Ремонты'}});
    const handleUpdateCrashList = () => {
        refetch().then(r => {
        })
    };

    return (
        // <h1>{row.name}</h1>
        <div className={classes.root}>
            {/*{store.dispatch({type:'SET_TITLE', text:'Сарансккабель3'})}*/}
            {/*<div className={classes.row}>*/}
            {/*    <SearchInput/>*/}
            {/*</div>*/}
            <div className={classes.content}>
                {data.days
                    .map((day) => (
                        <Fragment key={day.id}>
                            {day.crashListInDayStart.map(crash => (
                            crash.timeStop == null &&
                            <CrashAlert
                                key={crash.id}
                                services={crash.services.map(service => service.name)}
                                text={crash.text}
                                crashId={crash.id}
                                machineName={crash.machine.name}
                                handleUpdateMachine={handleUpdateCrashList}
                            />
                            ))}
                        </Fragment>

                    ))
                }

                <Card>
                    <CardContent>
                        <List component="nav" aria-label="main mailbox folders">
                            <Fragment>
                                {data.days.sort((a, b) => {
                                    if (a.day > b.day) return -1;
                                    if (a.day < b.day) return 1;
                                    return 0;
                                }).map((day, index) => (
                                    <Fragment key={index}>
                                        {day.crashListInDayStart.length > 0 &&
                                        <Fragment>
                                            <ListDay day={day.day}/>
                                            <Lists array={day.crashListInDayStart}/>
                                        </Fragment>
                                        }
                                    </Fragment>

                                ))}
                            </Fragment>
                        </List>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

// Machine.propTypes = {
//     id: PropTypes.number
// };

export default CrashLists;
