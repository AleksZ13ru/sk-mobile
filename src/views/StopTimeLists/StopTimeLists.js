import React, {Fragment, useEffect, useLayoutEffect} from 'react';
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
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import {makeStyles} from "@material-ui/core/styles";
import {Query} from "react-apollo";
import {loader} from "graphql.macro";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {store} from "../../store";

const STOP_TIME_LIST_ALL_DAY_QUERY = loader('./Graphql/STOP_TIME_LIST_ALL_DAY_QUERY.graphql');

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
        array.map((element) => {
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

    return (
        <ListItem key={id} button className={classes.list} component={Link}
                  to={`/stoptimelist/${id}`}>
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
                    <ListItemText primary={deltaTime} secondary="час."/>
                </Grid>
            </Grid>
        </ListItem>
    )
}

ListDayInfo.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
    deltaTime: PropTypes.number
};

function StopTimeLists(props) {
    // const {id} = props.match.params;
    const classes = useStyles();

    useEffect(() => {
        // Обновляем заголовок документа, используя API браузера
        store.dispatch({type:'SET_TITLE', text:'Простои'})
    });



    return (
        // <h1>{row.name}</h1>
        <div className={classes.root}>
            {/*{store.dispatch({type:'SET_TITLE', text:'Сарансккабель3'})}*/}
            {/*<div className={classes.row}>*/}
            {/*    <SearchInput/>*/}
            {/*</div>*/}
            <div className={classes.content}>
                {/*<Card className={classes.alert}>*/}
                {/*    <CardContent>*/}
                {/*        <List component="nav" aria-label="main mailbox folders">*/}
                {/*            <ListItem button className={classes.list}>*/}
                {/*                <Grid container wrap="nowrap" spacing={1}>*/}
                {/*                    <Grid item>*/}

                {/*                    </Grid>*/}
                {/*                    <Grid item xs zeroMinWidth>*/}
                {/*                        <Typography noWrap>1 Поломка крепления экструзионной головки</Typography>*/}
                {/*                    </Grid>*/}
                {/*                </Grid>*/}
                {/*            </ListItem>*/}
                {/*        </List>*/}

                {/*        /!*This is a warning alert — <strong>check it out!</strong>*!/*/}
                {/*    </CardContent>*/}
                {/*</Card>*/}

                <Card>
                    <CardContent>
                        <List component="nav" aria-label="main mailbox folders">
                            <Query query={STOP_TIME_LIST_ALL_DAY_QUERY}>
                                {({loading, error, data}) => {
                                    if (loading) return <div>Fetching</div>;
                                    if (error) return <div>Error</div>;

                                    return data.days.sort((a, b) => {
                                        if (a.day > b.day) return -1;
                                        if (a.day < b.day) return 1;
                                        return 0;
                                    }).map((day, index) => (
                                        <Fragment key={index}>
                                            {day.stopTimeListInDayStart.length > 0 &&
                                            <Fragment>
                                                <ListDay day={day.day}/>
                                                <Lists array={day.stopTimeListInDayStart}/>
                                            </Fragment>
                                            }

                                            {/*<ListDayInfo id={id} */}
                                            {/*             name={day.stopTimeListInDayStart.machine.name} */}
                                            {/*             text={day.text}/>*/}

                                        </Fragment>

                                    ))
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

export default StopTimeLists;
