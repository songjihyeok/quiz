import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
import './admin.scss'
import firebase from './../../firebaseConfig'
import Background from "../assets/background.jpeg"
import Logo from '../assets/logo.png'

var db = firebase.firestore();

const Login =(props)=>{

    const [email, setEmail] =useState(0)
    const [password, setPassword] = useState("")

    const emailHandler=(e)=>{
        setEmail(e.target.value)
    }

    const passwordHandler=(e)=>{
        setPassword(e.target.value)
    }

    const submitHandler=(e)=>{
        e.preventDefault()
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
            var user = userCredential.user;
             window.localStorage.setItem("user", user.uid)
            props.history.push("/admin/dashboard")
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage)
        })
    }
    

    return <div  className="adminloginWrapper">
        <div className="login">
        <img src={Logo} className="logo"></img>
        <Form>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label>아이디</Form.Label>
                    <Form.Control type="text" placeholder="아이디"  onChange={emailHandler}/>
                <Form.Label>비밀번호</Form.Label>
                <Form.Control type="password" placeholder="비밀번호" onChange={passwordHandler}/>
            </Form.Group>

            <Button variant="primary" type="submit"  onClick={submitHandler}>
                로그인
            </Button>
            </Form>
        </div>
    </div>
}

export default Login

