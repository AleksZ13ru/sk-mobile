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

function ListMachine(props) {
    const {id, name, category, kmv, crash} = props;
    const classes = useStyles();
    return (
        <ListItem key={id} button className={classes.list} component={Link}
                  to={`/machine/${id}`}>
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
    kmv: PropTypes.number,
    crash: PropTypes.number
};

function ListMachines(props) {
    const {machines, searchFilter} = props;
    // const {data: dataSearchMachine, client: clientSearchMachine} = useQuery(GET_SEARCH_MACHINE);
    return (
        <Fragment>
            {machines
                .filter((machine) => (machine.name.toLowerCase().includes(searchFilter.toLowerCase())) ||  machine.crash)
                .sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
                .sort((a, b) => {
                    if (a.crash > b.crash) return -1;
                    if (a.crash < b.crash) return 1;
                    return 0;
                })
                .map((machine) => (
                    <ListMachine key={machine.id} id={machine.id} name={machine.name} category={machine.category.name}
                                 kmv={machine.kmv} crash={machine.crash}/>
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

export default function Dashboard(props) {
    const [searchFilter, setSearchFilter] = React.useState(store.getState().searchMachine);
    // const [searchFilter, setSearchFilter] = React.useState('');

    const classes = useStyles();
    // useEffect(() => {
    //     // Обновляем заголовок документа, используя API браузера
    //     // store.dispatch({type:'SET_TITLE', text:'Сарансккабель2'})
    //     store.dispatch(setTitle('Сарансккабель'))
    // });
    const {client} = useQuery(GET_TITLE);
    // const {data: dataSearchMachine, client: clientSearchMachine} = useQuery(GET_SEARCH_MACHINE);
    const {loading, error, data} = useQuery(MACHINES_QUERY, {
        pollInterval: 5000,
    });
    if (loading) return (<Loading/>);
    if (error) return (<Error/>);

    const handleSetSearchFilter = (event) => {
        setSearchFilter(event.target.value);
        // clientSearchMachine.writeData({data: {searchMachine: event.target.value}});
        store.dispatch({type: 'SET_SEARCH_MACHINE', text: event.target.value})
    };

    const handleClearSearchFilter = () => {
        setSearchFilter('');
        // clientSearchMachine.writeData({data: {searchMachine: ''}});
        store.dispatch({type: 'CLEAR_SEARCH_MACHINE'})
    };


    // function handleChange() {
        // console.log(store.getState().searchMachine);
        // setSearchFilter(store.getState().searchMachine);
    // }

    // store.subscribe(handleChange);

    client.writeData({data: {title: 'Сарансккабель'}});
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

            {data.locations
                // .filter((location) => (location.id === "1"))
                .map((location) => (
                    <div className={classes.content} key={location.id}>
                        <Card open={false}>
                            <CardContent>
                                <List component="nav" aria-label="main mailbox folders">
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        {location.name}
                                    </ListSubheader>
                                    <ListMachines machines={location.machines} searchFilter={searchFilter}/>
                                </List>
                            </CardContent>
                        </Card>
                    </div>
                ))}


            {/*<Query query={MACHINES_QUERY}>*/}
            {/*    {({loading, error, data}) => {*/}
            {/*        if (loading) return <Loading/>;*/}
            {/*        if (error) return <div><Error/></div>;*/}
            {/*        return data.locations*/}
            {/*            // .filter((location) => (location.id === "1"))*/}
            {/*            .map((location) => (*/}
            {/*                <div className={classes.content} key={location.id} >*/}
            {/*                    <Card open={false}>*/}
            {/*                        <CardContent>*/}
            {/*                            <List component="nav" aria-label="main mailbox folders" >*/}
            {/*                                <ListSubheader component="div" id="nested-list-subheader">*/}
            {/*                                    {location.name}*/}
            {/*                                </ListSubheader>*/}
            {/*                                <ListMachines machines={location.machines} searchFilter={searchFilter}/>*/}
            {/*                            </List>*/}
            {/*                        </CardContent>*/}
            {/*                    </Card>*/}
            {/*                </div>*/}
            {/*            ))*/}
            {/*    }}*/}
            {/*</Query>*/}
        </div>
    )
}

Dashboard.propTypes = {

};
