import { Button, Col, Container, Form, Row, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";

import Student from "./Student";

const Classroom = () => {

    const [students, setStudents] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputMajor, setInputMajor] = useState('');
    const [inputInterest, setInputInterest] = useState('');

    useEffect(() => {
        fetch("https://cs571api.cs.wisc.edu/rest/s25/hw4/students", {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
            .then(res => res.json())
            .then(data => {
                setStudents(data);
            })
    }, []);
    console.log(students);

    const [activePage, setActivePage] = useState(1);

    const searchResult = students.filter(stu => (stu.name.first + " " + stu.name.last).toLowerCase().includes(inputName.toLowerCase().trim()))
        .filter(stu => stu.major.toLowerCase().includes(inputMajor.toLowerCase().trim()))
        .filter(stu => !inputInterest && stu.interests.length === 0 || stu.interests.some(intrst => intrst.toLowerCase().includes(inputInterest.toLowerCase().trim())));

    const pageNum = Math.ceil(parseFloat(searchResult.length / 24));
    let pages = [];
    pages.push(
        <Pagination.Prev key="previous" disabled={activePage === 1} onClick={() => {setActivePage(activePage - 1)}}>
            Previous
        </Pagination.Prev>
    )

    for (let num = 1; num <= pageNum; num++) {
        pages.push(
            <Pagination.Item key={num} active={num === activePage} onClick={() => setActivePage(num)}>
                {num}
            </Pagination.Item>
        );
    }

    pages.push(
        <Pagination.Next key="next" disabled={activePage === pageNum} onClick={() => {setActivePage(activePage + 1)}}>
            Next
        </Pagination.Next>
    )


    return <div>
        <h1>Badger Book</h1>
        <p>Search for students below!</p>
        <hr />
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control id="searchName" value={inputName} onChange={(e) => setInputName(e.target.value)} />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control id="searchMajor" value={inputMajor} onChange={(e) => setInputMajor(e.target.value)} />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control id="searchInterest" value={inputInterest} onChange={(e) => setInputInterest(e.target.value)} />
            <br />
            <Button variant="neutral" onClick={() => {
                setInputName("");
                setInputMajor("");
                setInputInterest("");
                setActivePage(1);
            }}>Reset Search</Button>
        </Form>
        <p>There are {searchResult.length} student(s) matching your search.</p>
        <Container fluid>
            <Row>
                {
                    searchResult.length > 0 ? searchResult.slice((activePage - 1) * 24, activePage * 24).map(stu => <Col xs={12} sm={12} md={6} lg={4} xl={3} key={stu.id}><Student {...stu} /></Col>) : <p>Still loading...</p>
                }
            </Row>
        </Container>
        <Pagination key="pages">{pages}</Pagination>
    </div>

}

export default Classroom;