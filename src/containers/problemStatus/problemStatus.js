import React, {useState, useEffect} from 'react'
import {Form, Button, ListGroup} from 'react-bootstrap'
import './problemStatus.scss'
import firebase from '../../firebaseConfig'
import Logo from '../assets/logo.png'
import Navbar from "../../componente/navbar/navbar" 

var db = firebase.firestore();

const ProblemStatus =(props)=>{

    const [problems, setProblems] = useState([])

    useEffect(()=>{
        db.collection("quiz")
        .get().then((querySnapshot)=>{
            let array = []
            querySnapshot.forEach((element)=>{
                array.push(element.data())
                console.log(element.data())
            })
            array.sort((a, b)=> a.number - b.number)
            console.log(array)
            setProblems(array)
        })
    },[])


    const possibleHandler=(element)=>{
        const number = element.number + ""
        console.log(element.possible)
        db.collection("quiz")
            .doc(number)
            .set({
                possible: !element.possible
            },{merge:true})
            .then((doc)=>{

                let removedProblems =  problems.filter((i)=>{
                    return i.number != element.number
                })
                element.possible = !element.possible
                let merged = [...removedProblems, element]
                merged.sort((a, b)=> a.number - b.number)
                setProblems(merged)
                alert("문제거 수정되었습니다.")
            })        
    }



    return <div  className="problemStatusWrapper">
        <Navbar></Navbar>
        <div>
          <ListGroup horizontal={'xl'} className="my-2">
                <ListGroup.Item className="number">문</ListGroup.Item>
                <ListGroup.Item className="text">문제 내용</ListGroup.Item>
                <ListGroup.Item className="number">답</ListGroup.Item>
                <ListGroup.Item className="possible">오픈여부</ListGroup.Item>
            </ListGroup>
            {problems.map((element)=>{
                return <ListGroup horizontal={'xl'} className="my-2"  key={element.number}>
                <ListGroup.Item className="number">{element.number}</ListGroup.Item>
                <ListGroup.Item className="text">{element.text.reduce((a,c)=> a+=c)}</ListGroup.Item>
                <ListGroup.Item className="number">{element.answer +1 }</ListGroup.Item>
                <ListGroup.Item onClick={()=>possibleHandler(element)}className="possible">{element.possible? "열림" : "꺼짐"}</ListGroup.Item>
            </ListGroup>
            })}

        </div>

    </div>
}

export default ProblemStatus
