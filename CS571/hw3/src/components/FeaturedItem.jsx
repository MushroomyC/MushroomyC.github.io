import { useState } from "react";
import { Button, Card, Table } from "react-bootstrap";

export default function FeaturedItem(props) {

    const [show, setShow] = useState(true);
    const [buttonText, setButtonText] = useState("Show Nutrition Facts");

    function flipButton() {
        setShow(show => show ? !show : !show);
        setButtonText(text => show ? "Hide Nutrion Facts" : "Show Nutrition Facts");
    }

    return <Card>
        {
            Object.keys(props).length > 0 ? <>
                <img src={props.img} alt={props.name}/>
                <h2>{props.name}</h2>
                <h5>${props.price} per unit</h5>
                <p>{props.description}</p>
                {!show ?
                    <>
                        <h5>Nutrition Facts</h5>
                        <Table>
                            <thead>
                                <tr>
                                    {Object.keys(props.nutrition).map(keys => <th key = {keys}>{keys}</th>)}
                                    {!Object.keys(props.nutrition).includes("fat") ? <th>Fat</th> : <></>}
                                    {!Object.keys(props.nutrition).includes("carbohydrates") ? <th>Carbohydrates</th> : <></>}
                                    {!Object.keys(props.nutrition).includes("protein") ? <th>Protein</th> : <></>}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                   {Object.values(props.nutrition).map(values => <td key = {values}>{values}</td>)}
                                   {!Object.keys(props.nutrition).includes("fat") ? <td>0g</td> : <></>}
                                   {!Object.keys(props.nutrition).includes("carbohydrates") ? <td>0g</td> : <></>}
                                   {!Object.keys(props.nutrition).includes("protein") ? <td>0g</td> : <></>}
                                </tr>
                            </tbody>
                        </Table>
                    </> : <></>}
                <Button onClick={flipButton}>{buttonText}</Button>
            </> : <p>I should display the feature that was passed to me...</p>
        }
    </Card>
}