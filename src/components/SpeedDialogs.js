import React, {Fragment} from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import Grid from "@material-ui/core/Grid";
import BuildIcon from '@material-ui/icons/Build';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const useStyles = makeStyles((theme) => ({
    exampleWrapper: {
        // position: 'relative',
        // margin: theme.spacing(6),
        // height: 180,

        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    fabs: {
        '& > *': {
            margin: theme.spacing(1),
        },
        position: 'fixed',
        bottom: theme.spacing(12),
        right: theme.spacing(2),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

export default function SpeedDialogs() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        console.log('32');
    };
    const handleToggle = () => {
        setOpen(!open);
    };
    return (
        <Fragment>
            <div className={classes.exampleWrapper}>
                <Fab color="primary" aria-label="add"
                     onClick={handleToggle}
                >
                    <AddIcon/>
                </Fab>
            </div>
            <div>
                <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
                    <div className={classes.fabs}>
                        <Grid container spacing={3} direction="column">
                            <Grid item>
                                <Fab style={{color:"white" ,backgroundColor:"#3f51b5"}} variant="extended" onClick={()=>{console.log('12')}}>
                                    <AccessAlarmIcon className={classes.extendedIcon}/>
                                    Добавить простой
                                </Fab>
                            </Grid>
                            <Grid item>
                                <Fab style={{color:"white" ,backgroundColor:"#219653"}} variant="extended" onClick={()=>{console.log('12')}}>
                                    <LibraryBooksIcon className={classes.extendedIcon}/>
                                    Добавить заметку
                                </Fab>
                            </Grid>
                            <Grid item>
                                <Fab style={{color:"white" ,backgroundColor:"#ff9800"}} variant="extended" onClick={()=>{console.log('12')}}>
                                    <BuildIcon className={classes.extendedIcon}/>
                                    Вызвать персонал
                                </Fab>
                            </Grid>
                        </Grid>
                    </div>
                </Backdrop>
            </div>
        </Fragment>
    )
}
