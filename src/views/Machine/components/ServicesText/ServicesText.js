import React, {Fragment} from "react";
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

export default function ServicesText(props) {
    const {services} = props;
    // (machine) => (machine.name.toLowerCase().includes(searchFilter.toLowerCase()))
    return (
        <Fragment>
            {services.filter(el => (el.checked)).map((el, index) => (
                    <b key={index}>{el.name} </b>
                )
            )}
        </Fragment>
    )
}

ServicesText.propTypes = {
    services: PropTypes.array
};
