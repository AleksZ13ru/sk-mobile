import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    switches: {
        margin: theme.spacing(1),
    },

    marginBottom: {
        marginBottom: theme.spacing(3),
    }
}));

export default function ServicesSelect(props) {
    const {services, handleChange} = props;
    const classes = useStyles();

    // const handleChange = (event) => {
    //     setState({...state, [event.target.name]: event.target.checked});
    // };

    return (
        <FormControl component="fieldset">
            <FormGroup className={classes.marginBottom}>
                {services.map((el, index) => (
                    <div key={index}>
                        <FormControlLabel
                            className={classes.switches}
                            control={<Switch checked={el.checked} name={el.key}/>}
                            label={el.name}
                            onChange={event => handleChange(event)}
                        />
                    </div>

                ))}
            </FormGroup>
            {/*<FormHelperText>Be careful</FormHelperText>*/}
        </FormControl>
    );
}

ServicesSelect.propTypes = {
    services: PropTypes.array,
    handleChange: PropTypes.func
};
