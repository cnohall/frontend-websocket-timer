import {Table } from  'react-bootstrap';

//Time variables
const second = 1000; //in milliseconds
const minute = 60 * second; 
// const hour = 60 * minute;


function TimeTable(props) {

    const startingTime = new Date(props.isoStartingTime);
    const partNumber = props.part;
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
                meetingParts[partNumber].ended = new Date((new Date(props.time)/1000 * 1000) - new Date(props.time).getTimezoneOffset() * minute).toISOString().substr(11, 8);
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