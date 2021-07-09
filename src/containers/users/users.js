import React, {useState, useEffect} from 'react'
import {Form, Button, ListGroup} from 'react-bootstrap'
import './users.scss'
import firebase from '../../firebaseConfig'
import Navbar from "../../componente/navbar/navbar" 
import {CSVLink} from'react-csv'

var db = firebase.firestore();

const Users =(props)=>{

    const [users, setUsers] = useState([])

    const headers = [
        { label: "사번", key: "number" },
        { label: "이름", key: "name" },
        { label: "푼 문제수", key: "finishedProblem" },
        { label: "정답율", key: "proportion"}
      ];

    useEffect(()=>{

        db.collection("user")
        .get().then((querySnapshot)=>{
            console.log(querySnapshot)
            let array = []
            querySnapshot.forEach((element)=>{
                array.push(element.data())
                console.log(element.data())
            })
            array.sort((a, b)=> a.number - b.number)
            console.log(array)
            setUsers(array)
        })

    },[])




    return <div  className="usersWrapper">
            <Navbar></Navbar>
            <CSVLink 
                    headers={headers} 
                    data={users} 
                    filename="users.csv" 
                    target="_blank"
                >
            <Button > 다운로드
             </Button>
             </CSVLink>
            <ListGroup horizontal={'xl'} className="my-2">
                <ListGroup.Item className="number">사번</ListGroup.Item>
                <ListGroup.Item className="text">이름</ListGroup.Item>
                <ListGroup.Item className="text">푼문제</ListGroup.Item>
                <ListGroup.Item className="proportion">정답율</ListGroup.Item>
            </ListGroup>
                {
                    users.map((element)=>{
                        return <div className="list">
                            <ListGroup horizontal={'xl'} className="my-2">
                            <ListGroup.Item className="number">{element.number}</ListGroup.Item>
                            <ListGroup.Item className="text">{element.name}</ListGroup.Item>
                            <ListGroup.Item className="text">{element.finishedProblem}</ListGroup.Item>
                            <ListGroup.Item className="proportion">{element.proportion}</ListGroup.Item>
                        </ListGroup>
                        </div>
                    })
                }
    </div>
}

export default Users
