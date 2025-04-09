import React from 'react';
import { useRef, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';

import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";
import { useNavigate } from 'react-router';

export default function BadgerLogin() {

    // TODO Create the login component.
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const usernameRef = useRef();
    const pinRef = useRef();
    const naviBackHome = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (usernameRef.current.value === "" || pinRef.current.value === "") {
            alert("You must provide both a username and pin!");
            return;
        }

        if (pinRef.current.value.length !== 7) {
            alert("Your pin is a 7-digit number!");
            return;
        } 

        fetch("https://cs571api.cs.wisc.edu/rest/s25/hw6/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameRef.current.value,
                pin: pinRef.current.value
            })
        })
        .then(res => {
            if (res.status === 200) {
                setLoginStatus(true);
                sessionStorage.setItem("loginStatus", true);
                sessionStorage.setItem("username", usernameRef.current.value);
                alert("Successfully logged in!");
                naviBackHome("/");
            } else if (res.status === 401) {
                alert("Incorrect username or pin!");
            } else {
                alert("Something's wrong!");
            }
        })
    }

    return <>
        <h1>Login</h1>
        <Form onSubmit={handleLogin}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" ref={usernameRef}></Form.Control>
            <br />
            <Form.Label htmlFor="pinInput">Password</Form.Label>
            <Form.Control id="pinInput" type="password" ref={pinRef}></Form.Control>
            <br />
            <Button type="submit" onClick={handleLogin}>Login</Button>
        </Form>
    </>
}
