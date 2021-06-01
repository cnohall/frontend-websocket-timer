import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row } from  'react-bootstrap';
import TimeTable from './view/time-table';


const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const socket = socketIOClient(ENDPOINT, {transports: ['websocket']});

//Time variables
const second = 1000; //in milliseconds
const min = 60 * second; 
const hour = 60 * min;

function App() {
  const [response, setResponse] = useState("");
  const [isoStartingTime, setIsoStartingTime] = useState();

  const [startTime, setStartTime] = useState("Not started yet");
  const [shouldEnd, setShouldEnd] = useState("");

  useEffect(() => {
    socket.on("FromAPI", data => {
      const serverTime = new Date(data);
      const currentTime = new Date(serverTime/1000 * 1000).toISOString().substr(11, 8)
      setResponse(currentTime);
    });
    socket.on("start", data => {
      const currentTime = new Date(data);
      const meetingLength = hour + (45 * min); // 105 minutes or 1 hour and 45 minutes
      const start = new Date(currentTime/1000 * 1000).toISOString().substr(11, 8)
      const end = new Date((currentTime/1000 * 1000) + meetingLength).toISOString().substr(11, 8)
      setStartTime("The meeting started at " + start);
      setShouldEnd("The meeting should end at " + end);
      setIsoStartingTime(currentTime);

    });
    socket.on("stop", data => {
      setStartTime("The meeting ended");
      setShouldEnd("");
    });
  }, []);

  return (
    <Container>
      <h4 className="m-5 text-center">
        <time dateTime={response}>Current time UTC: {response}</time>
      </h4>
      <h4 className="mx-5 text-center">
        <time dateTime={startTime}>{startTime}</time>
      </h4>
      <h4 className="mb-5 text-center">
        <time dateTime={shouldEnd}>{shouldEnd}</time>
      </h4>
      {
        isoStartingTime &&
        <TimeTable time={isoStartingTime}/>
      }
      <Row className="justify-content-center">
        <Button onClick={ () => socket.emit("start")} className='mx-3 btn-lg'>Start</Button>
        <Button onClick={ () => socket.emit("stop")} className='mx-3 btn-lg'>Stop</Button>
      </Row>
    </Container>
  );
}

export default App;