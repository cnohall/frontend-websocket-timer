import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Container, Row } from  'react-bootstrap';
//Production
const ENDPOINT = "https://backend-websocket-timer.herokuapp.com/";
//Local Testing
// const ENDPOINT = "http://localhost:4001";
const socket = socketIOClient(ENDPOINT, {transports: ['websocket']});

function App() {
  const [response, setResponse] = useState("");
  const [startTime, setStartTime] = useState("Not started yet");

  useEffect(() => {
    socket.on("FromAPI", data => {
      setResponse(data);
    });
    socket.on("start", data => {
      setStartTime("The meeting started " + data);
    });
    socket.on("stop", data => {
      setStartTime("The meeting stopped");
    });
  }, []);

  return (
    <Container>
      <h3 className="m-5 text-center">
        <time dateTime={response}>Current time UTC: {response}</time>
      </h3>
      <h3 className="m-5 text-center">
        <time dateTime={startTime}>{startTime}</time>
      </h3>
      <Row className="justify-content-center">
        <Button onClick={ () => socket.emit("start")} className='mx-3 btn-lg'>Start</Button>
        <Button onClick={ () => socket.emit("stop")} className='mx-3 btn-lg'>Stop</Button>
      </Row>
    </Container>
  );
}

export default App;