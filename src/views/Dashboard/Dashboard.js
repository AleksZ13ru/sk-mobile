import React, {Fragment, useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {loader} from "graphql.macro";
import {Query} from "react-apollo";

import SearchInput from "../../components/SearchInput";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from '@material-ui/icons/Info';
// import BuildIcon from '@material-ui/icons/Build';
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {store, setTitle} from "../../store";
import Loading from "../../components/Loading";
import Error from "../../components/Error";

const MACHINES_QUERY = loader('./Graphql/MACHINES_QUERY.graphql');

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


function ListMachine(props) {
    const {id, name, category, kmv} = props;
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
                    {0 === true &&
                    <ListItemIcon>
                        <InfoIcon fontSize="small" color={"secondary"}/>
                    </ListItemIcon>
                    }
                </Grid>
                <Grid item xs={9}>
                    <ListItemText primary={name} secondary={category}/>
                </Grid>
                <Grid item xs={2}>
                    <ListItemText primary={kmv} secondary="КМВ"/>
                </Grid>
            </Grid>
        </ListItem>
    )
}

ListMachine.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    category: PropTypes.string,
    kmv: PropTypes.number
};

function ListMachines(props) {
    const {machines, searchFilter} = props;
    return (
        <Fragment>
            {machines
                .filter((machine) => (machine.name.toLowerCase().includes(searchFilter.toLowerCase())))
                .map((machine) => (
                    <ListMachine key={machine.id} id={machine.id} name={machine.name} category={machine.category.name}
                                 kmv={machine.kmv}/>
                ))}
        </Fragment>
    )
}

ListMachines.propTypes = {
    machines: PropTypes.array,
    searchFilter: PropTypes.string
};

// <ListItem key={machine.id} button className={classes.list} component={Link}
//           to={`/machine/${machine.id}`}>
//     <Grid container
//           spacing={2}
//           direction="row"
//           justify="space-between"
//           alignItems="center">
//         <Grid item xs={1}>
//             <ListItemIcon>
//                 <InfoIcon fontSize="small" color={"secondary"}/>
//             </ListItemIcon>
//         </Grid>
//         <Grid item xs={9}>
//             <ListItemText primary={machine.name} secondary={machine.location}/>
//         </Grid>
//         <Grid item xs={2}>
//             <ListItemText primary={machine.kmv} secondary="КМВ"/>
//         </Grid>
//     </Grid>
// </ListItem>

export default function Dashboard() {
    const [searchFilter, setSearchFilter] = React.useState(store.getState().searchMachine);
    const classes = useStyles();

    const handleSetSearchFilter = (event) => {
        // setSearchFilter(event.target.value);
        store.dispatch({type: 'SET_SEARCH_MACHINE', text: event.target.value})
    };

    const handleClearSearchFilter = () => {
        // setSearchFilter('');
        store.dispatch({type: 'CLEAR_SEARCH_MACHINE'})
    };

    useEffect(() => {
        // Обновляем заголовок документа, используя API браузера
        // store.dispatch({type:'SET_TITLE', text:'Сарансккабель2'})
        store.dispatch(setTitle('Сарансккабель'))
    });

    function handleChange() {
        // console.log(store.getState().searchMachine);
        setSearchFilter(store.getState().searchMachine);
    }
    store.subscribe(handleChange);
    return (
        <div className={classes.root}>
            <div className={classes.row}>
                {/*<SearchInput value={searchFilter}*/}
                {/*             handleSetSearchFilter={handleSetSearchFilter}*/}
                {/*             handleClearSearchFilter={handleClearSearchFilter}/>*/}
                <SearchInput value={searchFilter}
                             handleSetSearchFilter={handleSetSearchFilter}
                             handleClearSearchFilter={handleClearSearchFilter}/>
            </div>

            <Query query={MACHINES_QUERY}>
                {({loading, error, data}) => {
                    if (loading) return <Loading/>;
                    if (error) return <div><Error/></div>;
                    return data.locations
                        // .filter((location) => (location.id === "1"))
                        .map((location) => (
                            <div className={classes.content} key={location.id} >
                                <Card open={false}>
                                    <CardContent>
                                        <List component="nav" aria-label="main mailbox folders" >
                                            <ListSubheader component="div" id="nested-list-subheader">
                                                {location.name}
                                            </ListSubheader>
                                            <ListMachines machines={location.machines} searchFilter={searchFilter}/>
                                        </List>
                                    </CardContent>
                                </Card>
                            </div>
                        ))
                }}
            </Query>
        </div>
    )
}

Dashboard.propTypes = {
    // searchFilter: PropTypes.string,
    // handleSetSearchFilter: PropTypes.func.isRequired
};
