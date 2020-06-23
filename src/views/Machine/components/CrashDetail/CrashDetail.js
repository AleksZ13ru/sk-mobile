import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles(theme => ({
    alert: {
        marginBottom: theme.spacing(2),
    }

}));

export default function CrashDetail(props) {
    const {id, services, text} = props;
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
        <div className={classes.alert}>            {/*<DetailsStopTimeList open={open} handleClose={handleClose}/>*/}

            <Alert variant="filled" severity="warning" icon={false} elevation={2} button onClick={()=>(alert('re'))}>
                {/*<AlertTitle>Механики</AlertTitle>*/}
                <strong>{services.map(el=>(`${el} `))} : </strong>{text}
            </Alert>
        </div>

    )
}

CrashDetail.propTypes = {
    id: PropTypes.string,
    services: PropTypes.array,
    text: PropTypes.number,
};
