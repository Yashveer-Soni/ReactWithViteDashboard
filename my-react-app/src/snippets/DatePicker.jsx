import React from 'react';
import { Datepicker } from "flowbite-react";
import '../static/css/DatePickerComponent.css';
import moment from 'moment'; 

const DatePickerComponent = ({ value, onChange }) => {
    const selectedDate = value ? moment(value, 'YYYY-MM-DD') : moment('2024-11-06', 'YYYY-MM-DD'); 

    const formattedDate = selectedDate.format('MMMM D, YYYY');

    return (
        <div className="flex flex-col mt-2 items-center">
            <Datepicker
                className="w-full datepicker custom-datepicker font-medium"
                selected={selectedDate} 
                onChange={(date) => onChange(moment(date).format('YYYY-MM-DD'))}
                todayButton="Today"
                placeholder="Choose a date"
                dateFormat="MM/dd/yyyy"
            />
            <p>{formattedDate}</p>
        </div>
    );
};

export default DatePickerComponent;
