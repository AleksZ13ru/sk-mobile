import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import StepContent from "@material-ui/core/StepContent";

export default function DateTimeSelect(props) {
    const {selectedDate, selectedTime, handleDateChange, handleTimeChange} = props;

    return (
        <Fragment>
            <KeyboardDatePicker
                disableToolbar
                autoOk={true}
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Дата"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
            <KeyboardTimePicker
                disableToolbar
                autoOk={true}
                ampm={false}
                minutesStep={5}
                margin="normal"
                variant="inline"
                id="time-picker"
                label="Время"
                value={selectedTime}
                onChange={handleTimeChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
            />
        </Fragment>

    )
}

DateTimeSelect.propTypes = {
    selectedDate: PropTypes.any,
    handleDateChange: PropTypes.func,
    selectedTime: PropTypes.any,
    handleTimeChange: PropTypes.func
};
