import React, { useState, useEffect } from "react";
import { Form, Button, Card, InputGroup, Row, Col } from "react-bootstrap";
import "./problem.scss";
import firebase from "../../firebaseConfig";
import Background from "../assets/background.jpeg"



const Problem = (props) => {

 var db = firebase.firestore();

  const [selected, setSelected ] = useState("radio-1");
  const [text, setText] = useState([])
  const [choice, setChoice] =useState([])
  const [possible, setPossible] = useState(false)
  const problemNumber = window.location.href.split("/problem/")[1]

 useEffect(()=>{
    db.collection("quiz")
    .doc(problemNumber)
    .get().then((doc)=>{
      if( Object.keys(doc.data()).length ==0 ){
        props.history.push("/complete")
        return
      }
        const data = doc.data()
        setText(data.text)
        setChoice(data.choice)
        setPossible(data.Possible)
    })
 },[])

 const nextProblemHandler=()=>{
    const userId = window.localStorage.getItem("userId")

    db.collection("user")
    .doc(userId)
    .collection(problemNumber)
    .add({
        "answerNumber": selected.split("-")[1], 
         "time": new Date() 
      }, { merge: true }).then((doc)=>{
        console.log("success", doc)
      })

    const nextNumber = parseInt(problemNumber) +1
    const nextUrl = "/beforeProblem/" + nextNumber
    props.history.push(nextUrl)
  //  props.history.push("/complete")

 }

  console.log( text)
  console.log(selected)

  return (
    <div className="problemWrapper" style={{backgroundImage: `url(${Background})`}}>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>문제 {problemNumber}번</Card.Title>
            {text.map((element)=>{
                   return <Card.Text>{element}</Card.Text>
            })}

          <div className="radiosWrapper">
            {choice.map((element,index)=>{
                 return <div className="radioWrapper" onClick={()=>setSelected(`radio-${index+1}`)}>
                 <input
                     type="radio"
                     id={`radio-${index+1}`}
                     name="myRadio"
                     value={index +1}
                     checked={selected == `radio-${index+1}`}
                 />
                 <div className="number">{element}</div>
             </div>
            })}
          </div>
          <Card.Link onClick={nextProblemHandler}>제출하기</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Problem;
