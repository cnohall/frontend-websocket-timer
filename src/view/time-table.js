import {Table } from  'react-bootstrap';
//Time variables
const second = 1000; //in milliseconds
const minute = 60 * second; 
// const hour = 60 * minute;

function TimeTable(props) {
    const startingTime = new Date(props.time);

    const a = calculatePartTime(startingTime, 0);
    const b = calculatePartTime(startingTime, 5);
    const c = calculatePartTime(startingTime, 6);
    const d = calculatePartTime(startingTime, 16);
    const e = calculatePartTime(startingTime, 26);
    const f = calculatePartTime(startingTime, 30);

    return (
        <Table striped bordered hover variant="dark" responsive>
        <thead>
            <tr>
            <th>Part</th>
            <th>Should start</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Song and Prayer</td>
                <td>{a}</td>
            </tr>
            <tr>
                <td>Initial Comments</td>
                <td>{b}</td>
            </tr>
            <tr>
                <td>Treasures from God's word</td>
                <td>{c}</td>
            </tr>
            <tr>
                <td>Spiritual Gems</td>
                <td>{d}</td>
            </tr>
            <tr>
                <td>Reading</td>
                <td>{e}</td>
            </tr>
            <tr>
                <td>Comments</td>
                <td>{f}</td>
            </tr>
        </tbody>
        </Table>
    );
}

const calculatePartTime = (meetingStart, amount_minutes) => {
    return "" + new Date((meetingStart/1000 * 1000) + (amount_minutes * minute)).toISOString().substr(11, 8);
}

export default TimeTable;