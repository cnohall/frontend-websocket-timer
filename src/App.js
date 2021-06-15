import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row, Jumbotron, Card } from  'react-bootstrap';
import TimeTable from './view/time-table';
import Clock from './view/clock';
import Navigationbar from "./view/navigationbar";


const ENDPOINT = process.env.REACT_APP_ENDPOINT;
const socket = socketIOClient(ENDPOINT, {transports: ['websocket']});

//Time variables
const second = 1000; //in milliseconds
const minute = 60 * second; 
const hour = 60 * minute;

function App() {
  const [time, setTime] = useState();
  const [part, setPart] = useState();
  
  const [timeStarted, setTimeStarted] = useState(false);
  const [startTime, setStartTime] = useState();
  const [shouldEnd, setShouldEnd] = useState("");


  useEffect(() => {
    socket.on("connected", res => {
      setTime(new Date(res.time).getTime());
      setPart(res.part);
      if (new Date(res.startingtime).getTime()){
        setStartEndTime(res.startingtime);
      }
    });
    socket.on("start", res => {
      setStartEndTime(new Date(res).getTime() - new Date(res).getTimezoneOffset() * minute)
    });
    socket.on("nextPart", res => {
      setPart(res)
    });
    socket.on("stop", res => {
      setStartTime();
      setShouldEnd("");
    });
  }, [time]);

  const setStartEndTime = (serverTime) => {
    const localTime = new Date(serverTime);
    const meetingLength = hour + (45 * minute); // 105 minute or 1 hour and 45 minute
    const end = new Date(serverTime + meetingLength ).toISOString().substr(11, 8)
    console.log(localTime)
    setStartTime(localTime);
    setShouldEnd("The meeting should end at " + end);
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
    <div>
      <Navigationbar/>
      <Jumbotron className='min-vh-100 mb-0'fluid>
        <Container>
        <Card className='p-4'>
            <h1>Meeting timer</h1>
            <p>
              Welcome to our meeting timer that helps you to keep track on the meeting time.
            </p>

            <Clock time={time} setTime={setTime}/>
            {
              startTime &&
              <div>
                <p className="">
                <time dateTime={startTime}>The meeting started at {new Date(startTime).toISOString().substr(11, 8)}</time>
                </p>
                <TimeTable part={part} startTime={startTime} time={time}/>
              </div>
            }
            <p className="mb-3">
              <time dateTime={shouldEnd}>{shouldEnd}</time>
            </p>
            <Row className="">
              <Button onClick={ () => handleStartButtonClick()} className='mx-3 btn'>{(timeStarted) ? "Next part" : "Start"}</Button>
              <Button onClick={ () => handleStopButtonClick()} className='mx-3 btn'>Stop</Button>
            </Row>
          </Card>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default App;

