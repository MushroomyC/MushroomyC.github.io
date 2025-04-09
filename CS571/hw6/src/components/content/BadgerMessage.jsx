import React from "react";
import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

function BadgerMessage(props) {
  const dt = new Date(props.created);
  const loginStatus = useContext(BadgerLoginStatusContext);

  const handleDelete = () => {
    props.delete(props.id);
  };

  return (
    <Card style={{ margin: "0.5rem", padding: "0.5rem" }}>
      <h2>{props.title}</h2>
      <sub>
        Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}
      </sub>
      <br />
      <i>{props.poster}</i>
      <p>{props.content}</p>
      {loginStatus && sessionStorage.getItem("username") === props.poster ? (
        <Button variant="danger" onClick={handleDelete}>
          Delete Post
        </Button>
      ) : (
        <></>
      )}
    </Card>
  );
}

export default BadgerMessage;
