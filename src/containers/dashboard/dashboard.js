import React, {useState, useEffect} from 'react'
import {Form, Button, ListGroup} from 'react-bootstrap'
import './dashboard.scss'
import firebase from '../../firebaseConfig'
import Logo from '../assets/logo.png'
import Navbar from "../../componente/navbar/navbar" 

var db = firebase.firestore();

const Dashboard =(props)=>{

    const problemnumbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17]
    const [data, setData] = useState([])
    const [propblemNumber, setProblemNumeber] = useState(1)
    const [answer, setAnswer] = useState(1)

    const getData=(element)=>{
        setProblemNumeber(element)
        db.collection("quiz")
        .doc(element+ "")
        .collection("solving")
        .get().then((querySnapshot)=>{
            let array = []
            querySnapshot.forEach((element)=>{
                array.push(element.data())
            })
            array.sort((a,b)=> a.time.seconds - b.time.seconds)
            setData(array)
        })
        db.collection("quiz")
        .doc(element+ "")
        .get().then((ref)=>{
            if(ref.data()){
                setAnswer(ref.data().answer)
            }
        })
    }




    return <div  className="problemStatusWrapper">
            <Navbar></Navbar>
            {problemnumbers.map((element)=>{
                return <Button variant="secondary" onClick={()=>getData(element)}>{element}</Button>
            })}
            <div className="statusWrapper">
          <ListGroup horizontal={'xl'} className="my-2">
                <ListGroup.Item className="problemNumber">문</ListGroup.Item>
                <ListGroup.Item className="number">사번</ListGroup.Item>
                <ListGroup.Item className="name">이름</ListGroup.Item>
                <ListGroup.Item className="time">푼 시간</ListGroup.Item>
                <ListGroup.Item className="answer">제출한 답</ListGroup.Item>
                <ListGroup.Item className="answer">정답</ListGroup.Item>
                <ListGroup.Item className="true">정답 여부</ListGroup.Item>
            </ListGroup>
            {data.map((element)=>{
                let time = new Date(element.time.seconds * 1000 + element.time.nanoseconds/1000000).toString().split("GMT")[0]
                return <ListGroup horizontal={'xl'} className="my-2">
                <ListGroup.Item className="problemNumber">{propblemNumber}</ListGroup.Item>
                <ListGroup.Item className="number">{element.number}</ListGroup.Item>
                <ListGroup.Item className="name">{element.name}</ListGroup.Item>
                <ListGroup.Item className="time">{time}</ListGroup.Item>
                <ListGroup.Item className="answer">{element.answerNumber} </ListGroup.Item>
                <ListGroup.Item className="answer"> {answer +1 }</ListGroup.Item>
                <ListGroup.Item className="true">{  element.answerNumber  ==   answer +1  ? "정답"  : "오답" }</ListGroup.Item>
            </ListGroup>
            })}
        </div>
    
    </div>
}

export default Dashboard
