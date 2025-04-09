import React from 'react';
import { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerRegister() {

    // TODO Create the register component.
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [repeatPin, setRepeatPin] = useState("");

    const naviBackHome = useNavigate();
    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);

    const handleRegister = (e) => {
        e.preventDefault();
        if (username === "" || pin === "") {
            alert("You must provide both a username and pin!");
            return;
        }

        if (pin.length !== 7 || repeatPin.length !== 7) {
            alert("Your pin must be a 7-digit number!");
            return;
        } 
        
        if (repeatPin !== pin) {
            alert("Your pins do not match!");
            return;
        }

        fetch("https://cs571api.cs.wisc.edu/rest/s25/hw6/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-CS571-ID": CS571.getBadgerId(),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                pin: pin
            })
        })
        .then(res => {
            if (res.status === 200) {
                setLoginStatus(true);
                sessionStorage.setItem("loginStatus", true);
                sessionStorage.setItem("username", username);
                alert("Successfully registered!");
                naviBackHome("/");
            } else if (res.status === 400) {
                alert("Your pin should be digits!")
            } else if (res.status === 409) {
                alert("That username has already been taken!");
            } else if (res.status === 413) {
                alert("Request entity too large!");
            } else {
                alert("Something's wrong!");
            }
        })
    }

    return <>
        <h1>Register</h1>
        <Form onSubmit={handleRegister}>
            <Form.Label htmlFor="usernameInput">Username</Form.Label>
            <Form.Control id="usernameInput" value={username} onChange={(e) => setUsername(e.target.value)}></Form.Control>
            <br />
            <Form.Label htmlFor="pinInput">Password</Form.Label>
            <Form.Control id="pinInput" type="password" value={pin} onChange={(e) => setPin(e.target.value)}></Form.Control>
            <br />
            <Form.Label htmlFor="repeatPinInput">Repeat Password</Form.Label>
            <Form.Control id="repeatPinInput" type="password" value={repeatPin} onChange={(e) => setRepeatPin(e.target.value)}></Form.Control>
            <br />
            <Button type="submit" onClick={handleRegister}>Register</Button>
        </Form>
    </>
}
