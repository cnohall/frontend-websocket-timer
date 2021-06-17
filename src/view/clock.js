//Time variables
import React, { useState } from "react";
const second = 1000; //in milliseconds
const minute = 60 * second; 

function Clock(props) {
    const time = props.time;
    const setTime = props.setTime;
    const [formatedTime, setFormatedTime] = useState("");

    time && setTimeout(() => {
        setTime(time + second);
        const localTime = new Date(time - new Date(time).getTimezoneOffset() * minute);
        const formated = localTime.toISOString().substr(11, 8)
        setFormatedTime(formated);
    }, 1000);

    return (
        <p className="mb-1">
            <time dateTime={formatedTime}>Current time: {formatedTime}</time>
        </p>
    );
}

export default Clock;