import React, {Fragment} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {gql, loader} from "graphql.macro";
import {useQuery} from "react-apollo";

import SearchInput from "../../components/SearchInput";
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
import {store} from "../../store";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const MASS_METERS_QUERY = loader('./Graphql/MASS_METERS_QUERY.graphql');

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
    }

}));
const GET_TITLE = gql`
    {
        title @client
    }
`;

// const GET_SEARCH_MACHINE = gql`
//     {
//         searchMachine @client
//     }
// `;

function ItemMassMeter(props) {
    // const {id, name, category, kmv, crash, inCrash} = props;
    const {id, name, sn, crash} = props;
    const classes = useStyles();
    return (
        <ListItem key={id} button className={classes.list} component={Link}
                  to={`/massmeter/${id}`}>
            <Grid container
                  spacing={2}
                  direction="row"
                  justify="flex-start"
                  alignItems="center">
                <Grid item xs={1}>
                    {crash > 0 &&
                    <ListItemIcon>
                        <FiberManualRecordIcon fontSize="small" style={{color: "#ff9800"}}/>
                    </ListItemIcon>
                    }
                </Grid>
                <Grid item xs={6}>
                    <ListItemText primary={name} secondary={sn}/>
                </Grid>
                <Grid item xs={3}>
                    <ListItemText primary={'5000 кг'} secondary={'предел'}/>
                </Grid>
                <Grid item xs={2}>
                    <ListItemText primary={'1%'} secondary={'погр.'}/>
                </Grid>
            </Grid>
        </ListItem>
    )
}

ItemMassMeter.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    kmv: PropTypes.number,
    crash: PropTypes.number,
    inCrash: PropTypes.bool
};

// function ListMassMeter(props) {
//     const {machines, searchFilter, inCrash} = props;
//     // const {data: dataSearchMachine, client: clientSearchMachine} = useQuery(GET_SEARCH_MACHINE);
//     return (
//         <Fragment>
//             {machines
//                 .filter((machine) => (machine.name.toLowerCase().includes(searchFilter.toLowerCase())) || machine.crash)
//                 .filter((machine) => (machine.crash && inCrash || !inCrash))
//                 .sort((a, b) => {
//                     if (a.name > b.name) return 1;
//                     if (a.name < b.name) return -1;
//                     return 0;
//                 })
//                 .sort((a, b) => {
//                     if (a.crash > b.crash) return -1;
//                     if (a.crash < b.crash) return 1;
//                     return 0;
//                 })
//                 .map((machine) => (
//                     <ItemMassMeter key={machine.id} id={machine.id} name={machine.name} category={machine.category.name}
//                                  kmv={machine.kmv} crash={machine.crash} inCrash={inCrash}/>
//                 ))}
//         </Fragment>
//     )
// }
//
// ListMachines.propTypes = {
//     machines: PropTypes.array,
//     searchFilter: PropTypes.string,
//     inCrash: PropTypes.bool
// };

export default function MassMeters(props) {
    // const [searchFilter, setSearchFilter] = React.useState(store.getState().searchMachine);

    const classes = useStyles();
    // useEffect(() => {
    //     // Обновляем заголовок документа, используя API браузера
    //     // store.dispatch({type:'SET_TITLE', text:'Сарансккабель2'})
    //     store.dispatch(setTitle('Сарансккабель'))
    // });
    const {client} = useQuery(GET_TITLE);
    // const {data: dataSearchMachine, client: clientSearchMachine} = useQuery(GET_SEARCH_MACHINE);
    const {loading, error, data} = useQuery(MASS_METERS_QUERY, {});
    if (loading) return (<Loading/>);
    if (error) return (<Error/>);

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

    client.writeData({data: {title: 'Весы'}});
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
                                Заголовок
                            </ListSubheader>
                            {data.massMeters.map((el) => (
                                    <Fragment key={el.id}>
                                        {/*<ListMachines machines={el.name} inCrash={true}/>*/}
                                        <ItemMassMeter id={el.id} name={el.name} sn={el.sn}/>
                                    </Fragment>

                                )
                            )}
                            {/*<ListMachines machines={location.machines} searchFilter={searchFilter}/>*/}
                        </List>
                    </CardContent>
                </Card>
            </div>
            {/*{data.locations*/}
            {/*    // .filter((location) => (location.id === "1"))*/}
            {/*    .map((location) => (*/}
            {/*        <div className={classes.content} key={location.id}>*/}
            {/*            <Card open={false}>*/}
            {/*                <CardContent>*/}
            {/*                    <List component="nav" aria-label="main mailbox folders">*/}
            {/*                        <ListSubheader component="div" id="nested-list-subheader">*/}
            {/*                            {location.name}*/}
            {/*                        </ListSubheader>*/}
            {/*                        <ListMachines machines={location.machines} searchFilter={searchFilter}/>*/}
            {/*                    </List>*/}
            {/*                </CardContent>*/}
            {/*            </Card>*/}
            {/*        </div>*/}
            {/*    ))}*/}
        </div>
    )
}

MassMeters.propTypes = {};
