import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row } from  'react-bootstrap';
import TimeTable from './view/time-table';
import Clock from './view/clock';


const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const socket = socketIOClient(ENDPOINT, {transports: ['websocket']});

//Time variables
const second = 1000; //in milliseconds
const minute = 60 * second; 
const hour = 60 * minute;

function App() {
  const [time, setTime] = useState("");
  const [isoStartingTime, setIsoStartingTime] = useState();

  const [part, setPart] = useState();
  
  const [timeStarted, setTimeStarted] = useState(false);
  const [startTime, setStartTime] = useState("Not started yet");
  const [shouldEnd, setShouldEnd] = useState("");


  useEffect(() => {
    socket.on("connected", res => {
      setTime(res.time);
      setPart(res.part);
      if (res.startingtime){
        setStartEndTime(res.startingtime);
      }
    });
    socket.on("start", res => {
      setStartEndTime(res)
    });
    socket.on("nextPart", res => {
      setPart(res)
    });
    socket.on("stop", res => {
      setStartTime("The meeting ended");
      setShouldEnd("");
    });
  }, [time]);

  const setStartEndTime = (serverTime) => {
    const localTime = new Date(new Date(serverTime) - new Date(serverTime).getTimezoneOffset() * minute);
    const meetingLength = hour + (45 * minute); // 105 minute or 1 hour and 45 minute
    const start = new Date(localTime).toISOString().substr(11, 8)
    const end = new Date((localTime/1000 * 1000) + meetingLength).toISOString().substr(11, 8)
    setStartTime("The meeting started at " + start);
    setShouldEnd("The meeting should end at " + end);
    setIsoStartingTime(localTime);
  } 

  const handleStartButtonClick = () => {
    if(!timeStarted){
      socket.emit("start");
    } else {
      socket.emit("nextPart");
    }
    setTimeStarted(true);
  } 

  const handleStopButtonClick = () => {
    setTimeStarted(false);
    socket.emit("stop");
  } 

  return (
    <Container>
      <Clock time={time} setTime={setTime}/>
      <h4 className="">
        <time dateTime={startTime}>{startTime}</time>
      </h4>
      {
        isoStartingTime &&
        <TimeTable part={part} isoStartingTime={isoStartingTime} time={time}/>
      }
      <h4 className="mb-5">
        <time dateTime={shouldEnd}>{shouldEnd}</time>
      </h4>
      <Row className="justify-content-center">
        <Button onClick={ () => handleStartButtonClick()} className='mx-3 btn-lg'>{(timeStarted) ? "Next part" : "Start"}</Button>
        <Button onClick={ () => handleStopButtonClick()} className='mx-3 btn-lg'>Stop</Button>
      </Row>
    </Container>
  );
}

export default App;

