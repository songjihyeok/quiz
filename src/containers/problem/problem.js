import React, { useState, useEffect } from "react";
import { Form, Button, Card, InputGroup, Row, Col } from "react-bootstrap";
import "./problem.scss";
import firebase from "../../firebaseConfig";
import Background from "../assets/background.jpeg";
import Logo from "../assets/logo.png";
import title from "../assets/title.png";
import inputImage from "../assets/long.png";
import ReactLoading from "react-loading";

const Problem = (props) => {
  var db = firebase.firestore();

  const [selected, setSelected] = useState("radio-1");
  const [text, setText] = useState([]);
  const [choice, setChoice] = useState([]);
  const [possible, setPossible] = useState(false);
  const [loading, setLoading] = useState(false);
  const problemNumber = window.location.href.split("/problem/")[1];

  useEffect(() => {
    db.collection("quiz")
      .doc(problemNumber)
      .get()
      .then((doc) => {
        const data = doc.data();

        if (data.possible == false) {
          alert("아직 문제가 열리지 않았습니다. ");
          props.history.goBack();
          return;
        }

        if (Object.keys(data).length == 0) {
          props.history.push("/complete");
          return;
        }

        console.log("Data", data);
        setText(data.text);
        setChoice(data.choice);
        setPossible(data.Possible);
        setLoading(true)
      });
  }, []);

  const nextProblemHandler = async() => {
    const userId = window.localStorage.getItem("userId");
    const number = window.localStorage.getItem("number");
    const name = window.localStorage.getItem("name");
    let proportion = 1
    let answer = 1
    let isRight = false
    db.collection("quiz")
      .doc(problemNumber)
      .collection("solving")
      .add(
        {
          number: number,
          name: name,
          answerNumber: selected.split("-")[1],
          time: new Date(),
        },
        { merge: true }
      )
      .then((doc) => {
      });

      await db.collection("quiz")
      .doc(problemNumber)
      .get()
      .then((doc) => {
        console.log("success!!!!!", doc.data());
        answer = doc.data().answer
      });

      console.log("answer", answer)
      isRight = parseInt(answer) + 1 == selected.split("-")[1]
       console.log("isRight", isRight) 

      await db.collection("user")
      .doc(userId)
      .get().then((doc)=>{
        console.log("DDDDDDDD",doc.data())
        if(!doc.data().proportion){
          proportion = 1
        }else{
          proportion = doc.data().proportion
        }
      })


    if(isRight){
      proportion = (proportion * (problemNumber-1) +1 ) / problemNumber
    } else{
      proportion =  proportion * (problemNumber-1) /problemNumber
    }

      db.collection("user")
      .doc(userId)
      .set(
        {
          number: number,
          name: name,
          finishedProblem: problemNumber,
          proportion: proportion
        },
        { merge: true }
      )
      .then((doc) => {
        console.log("success", doc);
      });  

    const nextNumber = parseInt(problemNumber) + 1;
    const nextUrl = "/beforeProblem/" + nextNumber;
    props.history.push(nextUrl);
  };  

  console.log("???", problemNumber -2)

  return (
    <div
      className="problemWrapper"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {!loading ? (
        <ReactLoading
          type="spokes"
          color="black"
          height={100}
          width={100}
        ></ReactLoading>
      ) : (
        <>
          <img src={Logo} className="logo"></img>
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <div
                className="problemTitle"
                style={{ backgroundImage: `url(${title})` }}
              > {problemNumber == 1 || problemNumber == 2 ? "연습 문제 " +  problemNumber +"번" : " 문제 " + (parseInt(problemNumber)-2) + "번" }
              </div>

              {text.map((element) => {
                return <Card.Text>{element}</Card.Text>;
              })}

              <div className="radiosWrapper">
                {choice.map((element, index) => {
                  return (
                    <div
                      className="radioWrapper"
                      onClick={() => setSelected(`radio-${index + 1}`)}
                      style={{ backgroundImage: `url(${inputImage})` }}
                    >
                      <div className="selectInput">
                        {selected == `radio-${index + 1}` ? index + 1 : null}
                      </div>
                      <div className="number">{element}</div>
                    </div>
                  );
                })}
              </div>
              <Card.Link onClick={nextProblemHandler}>제출하기</Card.Link>
            </Card.Body>
          </Card>
        </>
      )}
    </div>
  );
};

export default Problem;
