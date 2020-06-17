import React from "react";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    multilineTextFields: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '100%',

        },
        marginRight: theme.spacing(4),
        marginBottom: theme.spacing(3),
    },
}));

export default function MultilineTextFields(props) {
    const {text, handleChange } = props;
    const classes = useStyles();
    // const [value, setValue] = React.useState('Controlled');

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };

    return (
        <form className={classes.multilineTextFields} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-multiline-static"
                    label=""
                    multiline
                    rows={4}
                    defaultValue=""
                    variant="outlined"
                    value={text}
                    onChange={event => handleChange(event)}
                />
            </div>
        </form>
    );
}

MultilineTextFields.propTypes = {
    text: PropTypes.array,
    handleChange: PropTypes.func
};
