import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import './login.scss'
import firebase from './../../firebaseConfig'
import Background from "../assets/background.jpeg"
import Logo from '../assets/logo.png'

var db = firebase.firestore();

const Login =(props)=>{

    const [number, setNumber] =useState(0)
    const [name, setName] = useState("")

    const numberHandler=(e)=>{
        setNumber(e.target.value)
    }

    const nameHandler=(e)=>{
        setName(e.target.value)
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        db.collection("user")
            .add({
                id: number, 
                name: name
         }).then((doc)=>{
             window.localStorage.setItem("userId", doc.id)
             window.localStorage.setItem("number", number)
             window.localStorage.setItem("name", name)
             props.history.push("/beforeProblem/3")
         })
    }
    

    return <div  className="loginWrapper" style={{backgroundImage: `url(${Background})`}}>
        <div className="login">
        <img src={Logo} className="logo"></img>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>이름</Form.Label>
                    <Form.Control type="text" placeholder="이름"  onChange={nameHandler}/>
                </Form.Group>  
                <Form.Label>사번</Form.Label>
                <Form.Control type="text" placeholder="사번" onChange={numberHandler}/>
            </Form.Group>

            <Button variant="primary" type="submit"  onClick={submitHandler}>
                진행하기
            </Button>
            </Form>
    </div>
    </div>
}

export default Login

