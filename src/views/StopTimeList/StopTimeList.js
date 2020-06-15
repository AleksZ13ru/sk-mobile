import React, {Fragment} from 'react';
// import SearchInput from "../../components/SearchInput";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
// import {Link} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import InfoIcon from "@material-ui/icons/Info";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
// import Alert from "@material-ui/lab/Alert";
// import AlertTitle from "@material-ui/lab/AlertTitle";
// import FlagIcon from "@material-ui/icons/Flag";
// import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
// import BuildIcon from "@material-ui/icons/Build";
// import Typography from "@material-ui/core/Typography";
import {Query} from "react-apollo";
import {loader} from "graphql.macro";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
// import PropTypes from "prop-types";

const STOP_TIME_LIST_QUERY = loader('./Graphql/STOP_TIME_LIST_QUERY.graphql');

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


function Lists(props) {
    const {array} = props;
    return (
        array.map((element) => {
            return (
                <ListInfo id={element.id} text={element.name}/>
            )
        })
    )
}

Lists.propTypes = {
    array: PropTypes.array
};

function ListInfo(props) {
    const {id, text} = props;
    const classes = useStyles();

    return (
        <ListItem key={id} button className={classes.list} component={Link}
                  to={`#`}>
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
                <Grid item xs={11}>
                    <ListItemText primary={`${text}`} secondary={``}/>
                </Grid>
                {/*<Grid item xs={2}>*/}
                {/*<ListItemText primary={deltaTime} secondary="час."/>*/}
                {/*</Grid>*/}
            </Grid>
        </ListItem>
    )
}

ListInfo.propTypes = {
    id: PropTypes.number,
    text: PropTypes.string,
};

function StopTimeList(props) {
    const {id} = props.match.params;
    const classes = useStyles();
    return (
        // <h1>{row.name}</h1>
        <div className={classes.root}>
            {/*<div className={classes.row}>*/}
            {/*    <SearchInput/>*/}
            {/*</div>*/}
            <div className={classes.content}>
                {/*<h2>Простой {id}</h2>*/}

                <Card>
                    <CardContent>
                        <List component="nav" aria-label="main mailbox folders">
                            <Query query={STOP_TIME_LIST_QUERY} variables={{"pk": id}}>
                                {({loading, error, data}) => {
                                    if (loading) return <div>Fetching</div>;
                                    if (error) return <div>Error</div>;
                                    return (
                                        <Fragment>
                                            {/*<h2>{data.stopTimeList.text}</h2>*/}
                                            <ListSubheader component="div" id="nested-list-subheader">
                                                Оборудование
                                            </ListSubheader>
                                            <ListInfo id={1} text={data.stopTimeList.machine.name}/>
                                            <ListSubheader component="div" id="nested-list-subheader">
                                                Время
                                            </ListSubheader>
                                            <ListInfo id={1} text={"3 часа с 08-30 по 11-30"}/>
                                            <ListSubheader component="div" id="nested-list-subheader">
                                                Службы
                                            </ListSubheader>
                                            <Lists array={data.stopTimeList.services}/>
                                            <ListSubheader component="div" id="nested-list-subheader">
                                                Описание
                                            </ListSubheader>
                                            <ListInfo id={1} text={data.stopTimeList.text}/>
                                        </Fragment>


                                    );


                                    // return data.days.sort((a, b) => {
                                    //     if (a.day > b.day) return -1;
                                    //     if (a.day < b.day) return 1;
                                    //     return 0;
                                    // }).map((day) => (
                                    //     <Fragment>
                                    //         {day.stopTimeListInDayStart.length > 0 &&
                                    //         <Fragment>
                                    //             <ListDay day={day.day}/>
                                    //             <Lists array={day.stopTimeListInDayStart}/>
                                    //         </Fragment>
                                    //         }
                                    //     </Fragment>
                                    //
                                    // ))
                                }}
                            </Query>
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

export default StopTimeList;
