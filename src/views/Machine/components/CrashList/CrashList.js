import React, {Fragment} from "react";
import DetailsStopTimeList from "../DetailsStopTimeList/DetailsStopTimeList";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import SaveIcon from '@material-ui/icons/Save';
import FlagIcon from '@material-ui/icons/Flag';
import {red} from "@material-ui/core/colors";

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(0),
        },
    },
    content: {
        marginTop: theme.spacing(1)
    },
    // alert: {
    //     marginBottom: theme.spacing(1),
    //     color: '#fff',
    //     backgroundColor: '#ff9800'
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
        paddingLeft: theme.spacing(),
    }

}));

export default function CrashList(props) {
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
        // setOpen(true);
        console.log('click')
    };

    return (
        <Fragment>
            {/*<DetailsStopTimeList open={open} handleClose={handleClose}/>*/}
            <ListItem key={id} className={classes.list}
                // component={Link}
                // to={`#`}
                //       onClick={handleClickOpen}
            >
                <Grid container
                      spacing={0}
                      direction="column"
                      justify="space-between"
                      alignItems="flex-start">

                    <Grid container
                          spacing={0}
                          direction="row"
                          justify="space-between"
                          alignItems="center">
                        {/*<Grid item xs={1}>*/}

                        {/*</Grid>*/}
                        <Grid item xs={12}>
                            <ListItemText primary={`Механики, Электрики`} secondary={`Поломка крепления экструзионной ...`}/>
                        </Grid>
                    </Grid>
                    {/*<Grid container*/}
                    {/*      spacing={0}*/}
                    {/*      direction="row"*/}
                    {/*      justify="space-between"*/}
                    {/*      alignItems="center">*/}
                    {/*    /!*<Grid item xs={1}>*!/*/}

                    {/*    /!*</Grid>*!/*/}
                    {/*    <Grid item xs={12}>*/}
                    {/*        <ListItemText primary={`Поломка крепления экструзионной ...`}/>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                    {/*<Grid container*/}
                    {/*      spacing={1}*/}
                    {/*      direction="row"*/}
                    {/*      justify="space-between"*/}
                    {/*      alignItems="center">*/}
                    {/*    /!*<Grid item xs={1}>*!/*/}

                    {/*    /!*</Grid>*!/*/}
                    {/*    <Grid item xs={6}>*/}

                    {/*        <ListItemText primary={`24 часа`} secondary={`с 09-00`}/>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={6}>*/}
                    {/*        <Button*/}
                    {/*            variant="contained"*/}
                    {/*            color="primary"*/}
                    {/*            // size="small"*/}
                    {/*            className={classes.button}*/}
                    {/*            startIcon={<FlagIcon />}*/}
                    {/*            onClick={()=>alert('hello!')}*/}
                    {/*        >*/}
                    {/*            Завершить*/}
                    {/*        </Button>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </Grid>
            </ListItem>
        </Fragment>

    )
}

CrashList.propTypes = {
    id: PropTypes.string,
    counter: PropTypes.number,
    totalLength: PropTypes.number,
};
