import React, {Fragment} from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import {makeStyles} from "@material-ui/core/styles";
import Backdrop from '@material-ui/core/Backdrop';
import Grid from "@material-ui/core/Grid";
import BuildIcon from '@material-ui/icons/Build';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import {useHistory} from "react-router-dom";
import StopTimeAddDialog from "../StopTimeAddDialog";
import CrashDialogAdd from "../CrashDialogAdd";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
    exampleWrapper: {
        // position: 'relative',
        // margin: theme.spacing(6),
        // height: 180,

        position: 'fixed',
        bottom: theme.spacing(3),
        right: theme.spacing(3),
        zIndex: theme.zIndex.drawer + 1,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
        margin: theme.spacing(0)
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

export default function SpeedDialogs(props) {
    const {idMachine, nameMachine, handleUpdateMachine} = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openCrashDialog, setOpenRepairAddDialog] = React.useState(false);
    const [openStopTimeAddDialog, setOpenStopTimeAddDialog] = React.useState(false);
    let history = useHistory();

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    const handleClickOpenRepairAddDialog = () => {
        setOpenRepairAddDialog(true);
    };

    const handleCloseCrashDialogAdd = () => {
        setOpenRepairAddDialog(false);
    };

    const handleClickOpenStopTimeAddDialog = () => {
        setOpenStopTimeAddDialog(true);
    };

    const handleCloseStopTimeAddDialog = () => {
        setOpenStopTimeAddDialog(false);
        handleUpdateMachine();
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
                                <Fab style={{color: "white", backgroundColor: "#3f51b5"}} variant="extended"
                                     onClick={handleClickOpenStopTimeAddDialog}>
                                    <AccessAlarmIcon className={classes.extendedIcon}/>
                                    Добавить простой
                                </Fab>
                            </Grid>
                            <Grid item>
                                <Fab style={{color: "white", backgroundColor: "#219653"}} variant="extended"
                                     onClick={() => history.push('/repair_add')}>
                                    <LibraryBooksIcon className={classes.extendedIcon}/>
                                    Добавить заметку
                                </Fab>
                            </Grid>
                            <Grid item>
                                <Fab style={{color: "white", backgroundColor: "#ff9800"}} variant="extended"
                                     onClick={handleClickOpenRepairAddDialog}>
                                    <BuildIcon className={classes.extendedIcon}/>
                                    Вызов персонала
                                </Fab>
                            </Grid>
                        </Grid>
                    </div>
                </Backdrop>
                <StopTimeAddDialog
                    idMachine={idMachine}
                    nameMachine={nameMachine}
                    openRepairAddDialog={openStopTimeAddDialog}
                    handleClose={handleCloseStopTimeAddDialog}
                />
                <CrashDialogAdd
                    idMachine={idMachine}
                    nameMachine={nameMachine}
                    openCrashDialogAdd={openCrashDialog}
                    handleClose={handleCloseCrashDialogAdd}
                    />
            </div>
        </Fragment>
    )
}

SpeedDialogs.propTypes ={
    idMachine: PropTypes.string,
    nameMachine: PropTypes.string,
    handleUpdateMachine: PropTypes.func
};
