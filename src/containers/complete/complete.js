import React, { useState, useEffect } from "react";
import { Form, Button, Card, InputGroup, Row, Col } from "react-bootstrap";
import "./complete.scss";
import Background from "../assets/background.jpeg"
import Logo from '../assets/logo.png'

const BeforeProblem = (props) => {

    const submitHandler=()=>{
        
        props.history.push("/problem/1")
    }

  return (
    <div className="beforeproblemWrapper"  style={{backgroundImage: `url(${Background})`}}>
        <img src={Logo} className="logo"></img>
        <Form>
            <Card className="cardWrapper">
                모든 문제가 접수되었습니다.  <br></br>참여해주셔서 감사합니다. 
            </Card>
        </Form>
    </div>
  );
};

export default BeforeProblem;
