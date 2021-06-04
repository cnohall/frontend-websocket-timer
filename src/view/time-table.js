import {Table } from  'react-bootstrap';

//Time variables
const second = 1000; //in milliseconds
const minute = 60 * second; 
// const hour = 60 * minute;


function TimeTable(props) {

    const startingTime = new Date(props.isoStartingTime);
    const partsEndingTimes = props.part;
    let meetingParts = [
        {   name: "Song and Prayer",            shouldEnd: shouldStartAt(startingTime, 0),      ended: '--'},
        {   name: "Initial Comments",           shouldEnd: shouldStartAt(startingTime, 5),      ended: '--'},
        {   name: "Treasures from God's word",  shouldEnd: shouldStartAt(startingTime, 6),      ended: '--'},
        {   name: "Spiritual Gems",             shouldEnd: shouldStartAt(startingTime, 16),     ended: '--'},
        {   name: "Reading",                    shouldEnd: shouldStartAt(startingTime, 26),     ended: '--'},
        {   name: "Comments",                   shouldEnd: shouldStartAt(startingTime, 30),     ended: '--'},
    ]
        
    return (
        <Table striped bordered hover variant="dark" responsive>
        <thead>
            <tr>
                <th>Part</th>
                <th>Should Start</th>
                <th>Ended</th>
            </tr>
        </thead>
        <tbody>
            {meetingParts.map((part, index) => {
                if (partsEndingTimes[index]){
                    part.ended = new Date((new Date(partsEndingTimes[index])/1000 * 1000) - new Date(partsEndingTimes[index]).getTimezoneOffset() * minute).toISOString().substr(11, 8);
                } else if (partsEndingTimes.length === index) {
                    part.ended = new Date((new Date(new Date())/1000 * 1000) - new Date(new Date()).getTimezoneOffset() * minute).toISOString().substr(11, 8);
                }
                return (
                <tr key={part.name}>
                    <td>{part.name}</td>
                    <td>{part.shouldEnd}</td>
                    <td>{part.ended}</td>
                </tr>
                )
            })}
        </tbody>
        </Table>
    );
}

const shouldStartAt = (meetingStart, amount_minutes) => {
    return new Date((meetingStart/1000 * 1000) + (amount_minutes * minute)).toISOString().substr(11, 8);
}

export default TimeTable;