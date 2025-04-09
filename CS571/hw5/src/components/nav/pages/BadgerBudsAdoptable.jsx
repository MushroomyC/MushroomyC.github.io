import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudSummary from "../../BadgerBudSummary";

import { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";


export default function BadgerBudsAdoptable(props) {

    const buds = useContext(BadgerBudsDataContext);
    const [availableCats, setAvailableCats] = useState([]);

    useEffect(() => {
        updateBasket();
    }, [buds])

    const updateBasket = () => {
        if (!sessionStorage.getItem("savedCatIds")) {
            sessionStorage.setItem("savedCatIds", JSON.stringify([]));
        }
        if (!sessionStorage.getItem("adoptedCatIds")) {
            sessionStorage.setItem("adoptedCatIds", JSON.stringify([]));
        }
        const savedCats = JSON.parse(sessionStorage.getItem("savedCatIds"));
        const adoptedCats = JSON.parse(sessionStorage.getItem("adoptedCatIds"));
        setAvailableCats(buds.filter(bud => !savedCats.includes(bud.id))
            .filter(bud => !adoptedCats.includes(bud.id)));
    }

    return <div>
        <h1>Available Badger Buds</h1>
        <p>The following cats are looking for a loving home! Could you help?</p>
        <Row>
            {
                availableCats.length === 0 ? <p>No buds are available for adoption!</p> :
                    availableCats.map(bud => {
                        return <Col xs={12} sm={12} md={6} lg={4} xl={3} key={bud.id}>
                            <Card>
                                <BadgerBudSummary {...bud} update={updateBasket} available={true} />
                            </Card>
                        </Col>
                    })
            }
        </Row>
    </div>
}