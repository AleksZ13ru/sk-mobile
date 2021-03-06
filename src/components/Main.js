import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Footer from './Footer'
import {useQuery} from "@apollo/react-hooks";
import {gql} from "graphql.macro";
// import Fab from "@material-ui/core/Fab";
// import AddIcon from '@material-ui/icons/Add';
// import SpeedDialogs from './SpeedDialogs'
// import {store} from "../store";

const GET_TITLE = gql`
    {
        title @client
    }
`;
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(2),
        marginTop: theme.spacing(6),
    },
}));

export default function Main(props) {
    const {children} = props;

    const classes = useStyles();
    // const [title, setTitle] = React.useState(store.getState().title);
    const {data} = useQuery(GET_TITLE);
    const [openSidebar, setOpenSidebar] = React.useState(false);

    // const [title, setTitle] = React.useState('Сарансккабель');
    const handleSidebarOpen = () => {
        setOpenSidebar(true);

    };

    const handleSidebarClose = () => {
        setOpenSidebar(false);
    };

    // function handleChange() {
        // console.log(store.getState().title);
        // setTitle(store.getState().title);
    // }

    // store.subscribe(handleChange);
    // const unsubscribe = store.subscribe(handleChange);

    return (
        <div className={classes.root} style={{backgroundColor: grey[200]}}>
            {/*{store.subscribe(handleChange)}*/}
            <Topbar title={data.title} onSidebarOpen={handleSidebarOpen}/>
            <Sidebar
                onClose={handleSidebarClose}
                open={openSidebar}
            />
            <main className={classes.content}>
                {children}
            </main>
            <div>
                <Footer/>
            </div>

            {/*<SpeedDials/>*/}
            {/*<SpeedDialogs/>*/}
        </div>
    )
};

Main.propTypes = {
    // title: PropTypes.string,
    children: PropTypes.node
};
