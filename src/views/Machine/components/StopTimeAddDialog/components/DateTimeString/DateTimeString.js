import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {format} from "date-fns";
import ruLocale from "date-fns/locale/ru";

function DateIsValid(Date) {
    return (Date !== null && !isNaN(Date.getTime()))
}

export default function DateTimeString(props) {
    const {date, time} = props;
    const formatDT = "dd MMMM yyyy г. HH:mm";
    if (DateIsValid(date) && DateIsValid(time)) {
        const dt = new Date(date.getYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes());
        return (
            DateIsValid(date) && DateIsValid(time) &&
            <p><b>{format(dt, formatDT, {locale: ruLocale})}</b></p>
        )
    } else {
        return (
            <p></p>
        )
    }

}

DateTimeString.propTypes = {
    date: PropTypes.object,
    time: PropTypes.object,
};
