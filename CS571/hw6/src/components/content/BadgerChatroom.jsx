import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { Row, Col, Form, Button, Container } from "react-bootstrap";
import { Pagination } from "react-bootstrap";
import BadgerMessage from "./BadgerMessage";
import BadgerLoginStatusContext from "../contexts/BadgerLoginStatusContext";

export default function BadgerChatroom(props) {
  const loginStatus = useContext(BadgerLoginStatusContext);
  const [messages, setMessages] = useState([]);
  const [activePage, setActivePage] = useState(1);

  const titleRef = useRef();
  const contentRef = useRef();

  const loadMessages = (currentPage) => {
    fetch(
      `https://cs571api.cs.wisc.edu/rest/s25/hw6/messages?chatroom=${props.name}&page=${currentPage}`,
      {
        headers: {
          "X-CS571-ID": CS571.getBadgerId(),
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setMessages(json.messages);
      });
  };

  const pages = [];
  for (let pgNum = 1; pgNum <= 4; pgNum++) {
    pages.push(
      <Pagination.Item
        key={pgNum}
        active={activePage === pgNum}
        onClick={() => updatePages(pgNum)}
      >
        {pgNum}
      </Pagination.Item>
    );
  }

  const updatePages = (currPage) => {
    setActivePage(currPage);
    loadMessages(currPage);
  };

  const createPost = (e) => {
    e?.preventDefault();

    if (!loginStatus) {
      alert("You must be logged in to post!");
    } else {
      if (titleRef.current.value === "" || contentRef.current.value === "") {
        alert("You must provide both a title and content!");
        return;
      }

      fetch(
        `https://cs571api.cs.wisc.edu/rest/s25/hw6/messages?chatroom=${props.name}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "X-CS571-ID": CS571.getBadgerId(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: titleRef.current.value,
            content: contentRef.current.value,
          }),
        }
      ).then((res) => {
        if (res.status === 200) {
          alert("Successfully posted!");
          setActivePage(1);
          loadMessages(activePage);
        } else {
          alert("Something's wrong!");
        }
      });
    }

    titleRef.current.value = "";
    contentRef.current.value = "";
  };

  const deletePost = (postId) => {
    fetch(`https://cs571api.cs.wisc.edu/rest/s25/hw6/messages?id=${postId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "X-CS571-ID": CS571.getBadgerId(),
      },
    }).then((res) => {
      if (res.status === 200) {
        alert("Successfully deleted the post!");
        setActivePage(1);
        loadMessages(activePage);
      } else if (res.status === 401) {
        alert("Unauthorized! You need to log in first!");
      } else {
        alert("Something's wrong!");
      }
    });
  };

  // Why can't we just say []?
  // The BadgerChatroom doesn't unload/reload when switching
  // chatrooms, only its props change! Try it yourself.
  useEffect(() => loadMessages(activePage), [props]);

  return (
    <>
      <h1>{props.name} Chatroom</h1>
      {
        <Form onSubmit={createPost}>
          <Form.Label htmlFor="titleInput">Post Title</Form.Label>
          <Form.Control id="titleInput" ref={titleRef}></Form.Control>
          <br />
          <Form.Label htmlFor="contentInput">Post Content</Form.Label>
          <Form.Control id="contentInput" ref={contentRef}></Form.Control>
          <br />
          <Button type="submit" onClick={createPost}>
            Create Post
          </Button>
        </Form>
      }
      <hr />
      {messages.length > 0 ? (
        <Row>
          {messages.map((msg) => {
            return (
              <Col key={msg.id} xs={12} sm={12} md={6} lg={4} xl={3}>
                <BadgerMessage delete={deletePost} {...msg} />
              </Col>
            );
          })}
        </Row>
      ) : (
        <>
          <p>There are no messages on this page yet!</p>
        </>
      )}
      <Pagination key="pages">{pages}</Pagination>
    </>
  );
}
