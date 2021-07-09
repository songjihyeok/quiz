import React, { useState, useEffect } from "react";
import { Form, Button, Card, InputGroup, Row, Col } from "react-bootstrap";
import "./beforeProblem.scss";
import Background from "../assets/background.jpeg"
import Logo from '../assets/logo.png'
import firebase from "../../firebaseConfig";

const BeforeProblem = (props) => {
    var db = firebase.firestore();
    const url = window.location.href
    const number = url.split("/beforeProblem/")[1];

    const submitHandler=(e)=>{
        e.preventDefault()
        const nextNumber = parseInt(number) 
        console.log("?????", nextNumber)
        db.collection("quiz")
        .doc(nextNumber+"")
        .get().then((doc)=>{
         const data = doc.data()
        
         if(data == undefined){
            props.history.push("/complete")
            return
        }

         const possible = data.possible
            console.log("possible", possible)
            if(possible){
                const nextUrl = "/problem/" + nextNumber 
                props.history.push(nextUrl)                
            }else{
                props.history.push("/notOpen")                
            }
        })
    }

  return (
    <div className="beforeproblemWrapper"  style={{backgroundImage: `url(${Background})`}}>
        <img src={Logo} className="logo"></img>
        <Form>
            <Card className="cardWrapper">
                버튼을 눌러서 <br></br>문제에 참여해주세요
            </Card>
            <Button variant="primary" type="submit"  onClick={submitHandler}>
                참여하기
            </Button>
            </Form>
    </div>
  );
};

export default BeforeProblem;
