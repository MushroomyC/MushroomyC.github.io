import React from "react";
import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router';
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerLogout() {

    const [loginStatus, setLoginStatus] = useContext(BadgerLoginStatusContext);
    const naviBackHome = useNavigate();

    useEffect(() => {
        fetch('https://cs571api.cs.wisc.edu/rest/s25/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setLoginStatus(false);
            sessionStorage.setItem("loginStatus", false);
            sessionStorage.removeItem("username");
            alert("Successfully logged out!");
            naviBackHome("/");
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
