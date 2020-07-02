import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import CrashDialogEdit from "../CrashDialogEdit";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
    alert: {
        marginBottom: theme.spacing(2),
    }

}));

const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

export default function CrashAlert(props) {
    const {crashId, services, machineName, text, handleUpdateMachine} = props;
    const classes = useStyles();

    const [openCrashDialogEdit, setOpenCrashDialogEdit] = React.useState(false);

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
                {/*<strong>{services.map(el=>(`${el} `))} </strong> <i>{machineName}</i> : {text}*/}
                <Grid container
                      direction="row"
                      justify="flex-start"
                      alignItems="center">
                    <Grid item xs={12} align={"left"}>
                        {/*<Typography align={"left"}>*/}
                            <strong>{services.map(el=>(`${el} `))} </strong> <i>{machineName}</i> : {text}
                        {/*</Typography>*/}
                    </Grid>
                </Grid>
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
