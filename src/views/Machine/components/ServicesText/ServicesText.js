import React, {Fragment} from "react";
import PropTypes from "prop-types";

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
