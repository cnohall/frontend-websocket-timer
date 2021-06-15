import {Table } from  'react-bootstrap';

//Time variables
const second = 1000; //in milliseconds
const minute = 60 * second; 
// const hour = 60 * minute;




function TimeTable(props) {

    const startingTime = new Date(props.startTime);
    const partsEndingTimes = props.part;
    let meetingParts = [
        {   name: "Song and Prayer",            shouldStart: shouldStartAt(startingTime, 0),      ended: '--'},
        {   name: "Initial Comments",           shouldStart: shouldStartAt(startingTime, 5),      ended: '--'},
        {   name: "Treasures from God's word",  shouldStart: shouldStartAt(startingTime, 6),      ended: '--'},
        {   name: "Spiritual Gems",             shouldStart: shouldStartAt(startingTime, 16),     ended: '--'},
        {   name: "Reading",                    shouldStart: shouldStartAt(startingTime, 26),     ended: '--'},
        {   name: "Comments",                   shouldStart: shouldStartAt(startingTime, 30),     ended: '--'},
    ]
        
    return (
        <Table striped borderless hover variant="primary" >
        <thead>
            <tr>
                <th>Part</th>
                <th>Should Start</th>
                <th>Ended</th>
            </tr>
        </thead>
        <tbody>
            {meetingParts.map((part, index) => {
                //Parts that already ended
                if (partsEndingTimes[index]){
                    console.log(partsEndingTimes[index]);
                    part.ended = new Date(new Date(partsEndingTimes[index]) - new Date(partsEndingTimes[index]).getTimezoneOffset() * minute).toISOString().substr(11, 8);
                //Current part
                } else if (partsEndingTimes.length === index) {
                    part.ended = getLocalTime().toISOString().substr(11, 8);
                }
                return (
                <tr key={part.name}>
                    <td>{part.name}</td>
                    <td>{part.shouldStart}</td>
                    <td>{part.ended}</td>
                </tr>
                )
            })}
        </tbody>
        </Table>
    );
}

const getLocalTime = () => {
    const utc = new Date();
    const timezone = utc.getTimezoneOffset();
    return new Date(utc - (timezone * minute))
}
const shouldStartAt = (meetingStart, amount_minutes) => {
    return new Date((meetingStart/1000 * 1000) + (amount_minutes * minute)).toISOString().substr(11, 8);
}

export default TimeTable;