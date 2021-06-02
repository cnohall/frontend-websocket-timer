//Time variables
import React, { useEffect, useState } from "react";
const second = 1000; //in milliseconds
const minute = 60 * second; 


function Clock(props) {
    const [time, setTime] = useState(props.time);
    const [formatedTime, setFormatedTime] = useState("");

    useEffect(() => {
        time && setTimeout(() => {
            setTime((new Date(time)/1000 * 1000) + second);
            const serverTime = new Date(time);
            const localTime = new Date(serverTime/1000 * 1000 - serverTime.getTimezoneOffset() * minute);
            const formated = localTime.toISOString().substr(11, 8)
            setFormatedTime(formated);
        }, 1000);
    }, [time]);

    return (
        <h4 className="mt-5">
            <time dateTime={formatedTime}>Current time: {formatedTime}</time>
        </h4>
    );
}

export default Clock;