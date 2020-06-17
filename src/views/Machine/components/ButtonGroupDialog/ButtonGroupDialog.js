import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    // multilineTextFields: {
    //     '& .MuiTextField-root': {
    //         margin: theme.spacing(2),
    //         width: '100%',
    //
    //     },
    //     marginRight: theme.spacing(4),
    //     marginBottom: theme.spacing(3),
    // },
    // appBar: {
    //     position: 'relative',
    // },
    // title: {
    //     marginLeft: theme.spacing(2),
    //     flex: 1,
    // },
    // switches: {
    //     margin: theme.spacing(1),
    // },

    // marginBottom: {
    //     marginBottom: theme.spacing(3),
    // },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    // resetContainer: {
    //     padding: theme.spacing(2),
    // },
}));

export default function ButtonGroupDialog(props) {
    const classes = useStyles();
    const {disabledBack, disableNext, handleBack, handleNext, finishStepText} = props;
    return (
        <div className={classes.actionsContainer}>
            <div>
                <Button
                    disabled={disabledBack}
                    onClick={handleBack}
                    className={classes.button}
                >
                    Назад
                </Button>
                <Button
                    disabled={disableNext}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                >
                    {finishStepText ? finishStepText : 'Далее'}
                </Button>
            </div>
        </div>
    )
}

ButtonGroupDialog.propTypes = {
    disabledBack: PropTypes.bool,
    disableNext: PropTypes.bool,
    handleBack: PropTypes.func,
    handleNext: PropTypes.func,
    finishStepText: PropTypes.string
};
