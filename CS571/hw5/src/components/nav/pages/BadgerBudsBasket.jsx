import BadgerBudsDataContext from "../../../contexts/BadgerBudsDataContext";
import BadgerBudSummary from "../../BadgerBudSummary";

import { useContext, useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Card } from "react-bootstrap";

export default function BadgerBudsBasket(props) {

    const buds = useContext(BadgerBudsDataContext);
    const [catsInBasket, setCatsInBasket] = useState([]);

    useEffect(() => {
        updateBasket();
    }, [buds]);

    const updateBasket = () => {
        if (!sessionStorage.getItem("savedCatIds")) {
            sessionStorage.setItem("savedCatIds", JSON.stringify([]));
        }
        const savedCats = JSON.parse(sessionStorage.getItem("savedCatIds"));
        setCatsInBasket(buds.filter(bud => savedCats.includes(bud.id)));
    }
    
    return <div>
        <h1>Badger Buds Basket</h1>
        <p>These cute cats could be all yours!</p>
        <Row>
            {
                catsInBasket.length === 0 ? <p>You have no buds in your basket!</p> :
                    catsInBasket.map(bud => {
                        return <Col xs={12} sm={12} md={6} lg={4} xl={3} key={bud.id}>
                            <Card>
                                <BadgerBudSummary {...bud} update={updateBasket} available={false}/>
                            </Card>
                        </Col>
                    })
            }
        </Row>
    </div>
}