import React, { useState, useEffect } from "react";
import { Form, Button, Card, InputGroup, Row, Col } from "react-bootstrap";
import "./notOpen.scss";
import Background from "../assets/background.jpeg"
import Logo from '../assets/logo.png'

const NotOpen = (props) => {

    const submitHandler=(e)=>{ 
        e.preventDefault()
        props.history.goBack()
    }

  return (
    <div className="notOpenWrapper"  style={{backgroundImage: `url(${Background})`}}>
        <img src={Logo} className="logo"></img>
        <Form>
            <Card className="cardWrapper">
                문제가 아직  <br></br>오픈되지 않았습니다. 
            </Card>
            <Button variant="primary" type="submit"  onClick={submitHandler}>
                뒤로 돌아가기
            </Button>
        </Form>
    </div>
  );
};

export default NotOpen;
