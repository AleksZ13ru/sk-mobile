import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {gql, loader} from "graphql.macro";
import {useQuery} from "react-apollo";
// import SearchInput from "../../components/SearchInput";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
// import {store} from "../../store";
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import SpeedDialogs from "./components/SpeedDialogs/SpeedDialogs";
import useWebSocket from 'react-use-websocket';
import {SOCKET_WS_URL} from "../../constants";

const MASS_METER_QUERY = loader('./Graphql/MASS_METER_QUERY.graphql');
const GET_TITLE = gql`{title @client}`;

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    content: {
        marginTop: theme.spacing(1)
    },
    row: {
        height: '42px',
        display: 'flex',
        alignItems: 'center',
        marginTop: theme.spacing(1)
    },
    list: {
        paddingLeft: theme.spacing(0),
        paddingRight: theme.spacing(0),
    }

}));


function ItemMassMeter(props) {
    // const {id, name, category, kmv, crash, inCrash} = props;
    const {id, name, sn, limit, measurementError, documentNumber, documentExpiration} = props;
    const classes = useStyles();
    let formatter = new Intl.DateTimeFormat("ru", {
        day: "numeric",
        year: "numeric",
        // weekday: "long",
        month: "numeric"
    });
    return (
        <ListItem key={id} button className={classes.list} component={Link}
                  to={`/massmeter/${id}`}>
            <Grid container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="center">
                {/*<Grid item xs={0}>*/}
                {/*    {crash > 0 &&*/}
                {/*    <ListItemIcon>*/}
                {/*        <FiberManualRecordIcon fontSize="small" style={{color: "#ff9800"}}/>*/}
                {/*    </ListItemIcon>*/}
                {/*    }*/}
                {/*</Grid>*/}
                <Grid item xs={7}>
                    <ListItemText primary={`${name} №${sn}`} secondary={'весы'}/>
                </Grid>
                <Grid item xs={3}>
                    <ListItemText primary={`${limit} кг`} secondary={'предел'}/>
                </Grid>
                <Grid item xs={2}>
                    <ListItemText primary={`${measurementError} %`} secondary={'погр.'}/>
                </Grid>
                <Grid item xs={7}>
                    <ListItemText primary={`№ ${documentNumber}`} secondary={'Свидетельство'}/>
                </Grid>
                <Grid item xs={5}>
                    <ListItemText primary={formatter.format(new Date(documentExpiration))}
                                  secondary={'Срок окончания'}/>
                </Grid>
            </Grid>
        </ListItem>
    )
}

ItemMassMeter.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    sn: PropTypes.string,
    limit: PropTypes.number,
    measurementError: PropTypes.number,
    documentNumber: PropTypes.string,
    documentExpiration: PropTypes.string
};

function ItemEvent(props) {
    const {id, object, massObject, massIndication, measurementError} = props;
    const classes = useStyles();
    // let formatter = new Intl.DateTimeFormat("ru", {
    //     day: "numeric",
    //     year: "numeric",
    //     // weekday: "long",
    //     month: "long"
    // });
    return (
        <ListItem key={id} button className={classes.list} component={Link}
                  to={``}>
            <Grid container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="center">
                <Grid item xs={1}>
                    {Math.abs(100 - massIndication / massObject * 100) > measurementError &&
                    <ListItemIcon>
                        <FiberManualRecordIcon fontSize="small" style={{color: "#ff9800"}}/>
                    </ListItemIcon>
                    }
                </Grid>
                <Grid item xs={5}>
                    <ListItemText primary={`${object}`} secondary={'предмет'}/>
                </Grid>
                <Grid item xs={3}>
                    {massObject !== null && <ListItemText primary={`${massObject} кг.`} secondary={'учтен.'}/>}
                </Grid>
                <Grid item xs={3}>
                    <ListItemText primary={`${massIndication} кг.`} secondary={'измер.'}/>
                </Grid>
            </Grid>
        </ListItem>
    )
}

ItemEvent.propTypes = {
    id: PropTypes.string,
    postedByName: PropTypes.string,
    object: PropTypes.string,
    massObject: PropTypes.number,
    massIndication: PropTypes.number,
    measurementError: PropTypes.number
};

export default function MassMeter(props) {
    // const [searchFilter, setSearchFilter] = React.useState(store.getState().searchMachine);
    const {id} = props.match.params;
    const classes = useStyles();

    const [lastUpdate, setLastUpdate] = React.useState('');

    // const socket = React.useRef(new WebSocket("ws://127.0.0.1:8000/ws/subscribe/mass_meter/"));
    // const socketUrl = 'ws://127.0.0.1:8000/ws/subscribe/mass_meter/';
    const socketUrl = SOCKET_WS_URL+'mass_meter/';
    const {
        lastJsonMessage
    } = useWebSocket(socketUrl, {
        onOpen: () => refetch(),
        shouldReconnect: (closeEvent) => true,
    });
    useEffect(() => () => {
        console.log(lastJsonMessage);
        if (lastJsonMessage !== null && lastUpdate !== lastJsonMessage.message.massMeterLastUpdate) {
            setLastUpdate(lastJsonMessage.message.massMeterLastUpdate);
            refetch()
        }
    }, [lastJsonMessage]);

    // useEffect(() => {
    //     socket.current.onmessage = (msg) => {
    //         // const incomingMessage = `Message from WebSocket: ${msg.data}`;
    //         let data = JSON.parse(msg.data);
    //         if (lastUpdate !== data.message.massMeterLastUpdate) {
    //             setLastUpdate(data.message.massMeterLastUpdate);
    //             refetch()
    //         }
    //     };
    // });
    //
    // useEffect(() => () => socket.current.close(), [socket]);
    // useEffect(() => {
    //     // Обновляем заголовок документа, используя API браузера
    //     // store.dispatch({type:'SET_TITLE', text:'Сарансккабель2'})
    //     store.dispatch(setTitle('Сарансккабель'))
    // });
    const {client} = useQuery(GET_TITLE);
    // const {data: dataSearchMachine, client: clientSearchMachine} = useQuery(GET_SEARCH_MACHINE);
    const {loading, error, data, refetch} = useQuery(MASS_METER_QUERY, {
        variables: {"pk": id},
        onCompleted
    });

    if (loading) return (<Loading/>);
    if (error) return (<Error/>);

    function onCompleted() {
        client.writeData({data: {title: data.massMeter.name}});
    }

    // const handleSetSearchFilter = (event) => {
    // setSearchFilter(event.target.value);
    // clientSearchMachine.writeData({data: {searchMachine: event.target.value}});
    // store.dispatch({type: 'SET_SEARCH_MACHINE', text: event.target.value})
    // };

    // const handleClearSearchFilter = () => {
    // setSearchFilter('');
    // clientSearchMachine.writeData({data: {searchMachine: ''}});
    // store.dispatch({type: 'CLEAR_SEARCH_MACHINE'})
    // };


    // function handleChange() {
    // console.log(store.getState().searchMachine);
    // setSearchFilter(store.getState().searchMachine);
    // }

    // store.subscribe(handleChange);

    // client.writeData({data: {title: 'Весы'}});
    return (
        <div className={classes.root}>
            {/*<div className={classes.row}>*/}
            {/*    <SearchInput value={searchFilter}*/}
            {/*                 handleSetSearchFilter={handleSetSearchFilter}*/}
            {/*                 handleClearSearchFilter={handleClearSearchFilter}/>*/}
            {/*    <SearchInput value={searchFilter}*/}
            {/*                 handleSetSearchFilter={handleSetSearchFilter}*/}
            {/*                 handleClearSearchFilter={handleClearSearchFilter}/>*/}
            {/*</div>*/}
            <div className={classes.content}>
                <Card>
                    <CardContent>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListSubheader component="div" id="nested-list-subheader">
                                Описание
                            </ListSubheader>
                            <ItemMassMeter id={data.massMeter.id}
                                           name={data.massMeter.name}
                                           sn={data.massMeter.sn}
                                           limit={data.massMeter.limit}
                                           measurementError={data.massMeter.measurementError}
                                           documentNumber={data.massMeter.documentActual.number}
                                           documentExpiration={data.massMeter.documentActual.dateExpiration}
                            />
                        </List>
                    </CardContent>
                </Card>
            </div>

            <div className={classes.content}>
                <Card>
                    <CardContent>
                        <List component="nav" aria-label="main mailbox folders">
                            <ListSubheader component="div" id="nested-list-subheader">
                                История взвешиваний
                            </ListSubheader>
                            {data.massMeter.events
                                .sort((a, b) => {
                                    if (a.dtCreate > b.dtCreate) return -1;
                                    if (a.dtCreate < b.dtCreate) return 1;
                                    return 0;
                                })
                                .map(el => (
                                    <ItemEvent
                                        key={el.id}
                                        id={el.id}
                                        object={el.object}
                                        massObject={el.massObject}
                                        massIndication={el.massIndication}
                                        postedByName={el.postedBy.username}
                                        measurementError={data.massMeter.measurementError}
                                    />
                                ))}
                        </List>
                    </CardContent>
                </Card>
            </div>
            <SpeedDialogs idMachine={id} nameMachine={data.massMeter.name}/>
        </div>
    )
}

MassMeter.propTypes = {};
