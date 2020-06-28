import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import CrashDialogEdit from "../CrashDialogEdit";

const useStyles = makeStyles(theme => ({
    alert: {
        marginBottom: theme.spacing(2),
    }

}));

export default function CrashAlert(props) {
    const {crashId, services, machineName, text, handleUpdateMachine} = props;
    const classes = useStyles();

    const [openCrashDialogEdit, setOpenCrashDialogEdit] = React.useState(false);
    //
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    //
    const handleCloseCrashDialogEdit = () => {
        setOpenCrashDialogEdit(false);
    };

    const handleClick = () => {
        setOpenCrashDialogEdit(true);
    };

    return (
        <div className={classes.alert}>            {/*<DetailsStopTimeList open={open} handleClose={handleClose}/>*/}
            <Alert variant="filled" severity="warning" icon={false} elevation={2} button="true" onClick={handleClick}>
                {/*<AlertTitle>Механики</AlertTitle>*/}
                <strong>{services.map(el=>(`${el} `))} </strong>{machineName} :{text}
            </Alert>
            <CrashDialogEdit
                crashId={crashId}
                open={openCrashDialogEdit}
                handleClose={handleCloseCrashDialogEdit}
                handleUpdateMachine={handleUpdateMachine}
            />
        </div>

    )
}

CrashAlert.propTypes = {
    crashId: PropTypes.string,
    services: PropTypes.array,
    machineName: PropTypes.string,
    text: PropTypes.string,
    handleUpdateMachine: PropTypes.func
};
