import PropTypes from "prop-types";
import React from "react";

export default function Machine(props) {
    const {nameMachine} = props;

    return (
        <div>
            <h2>{nameMachine}</h2>
        </div>

    )
}

Machine.propTypes = {
    nameMachine: PropTypes.string
};
