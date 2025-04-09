import { useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";

const BadgerBudSummary = (bud) => {
    const [showInfo, setShowInfo] = useState(false);
    const savedCatIds = JSON.parse(sessionStorage.getItem("savedCatIds"));
    const adoptedCatIds = JSON.parse(sessionStorage.getItem("adoptedCatIds"));

    const saveToBasket = (name, id) => {
        const newSavedIds = savedCatIds;
        newSavedIds.push(id);

        sessionStorage.setItem("savedCatIds", JSON.stringify(newSavedIds));
        bud.update();
        alert(name + " has been added to your basket!");
    }

    const removeFromBasket = (id) => {
        const newSavedIds = savedCatIds.filter(catId => catId !== id);
        sessionStorage.setItem("savedCatIds", JSON.stringify(newSavedIds));
    }

    const adoptCat = (name, id) => {
        removeFromBasket(id);
        const newAdoptedIds = adoptedCatIds;
        newAdoptedIds.push(id);

        sessionStorage.setItem("adoptedCatIds", JSON.stringify(newAdoptedIds));
        bud.update();
        alert(name + " has been adopted!");
    }

    const remove = (name, id) => {
        removeFromBasket(id);
        bud.update();
        alert(name + " has been removed from your basket!");
    }

    return <Card>
        {showInfo ?
            <Carousel>
                {
                    bud.imgIds.length > 0 ?
                        bud.imgIds.map(imgId => <Carousel.Item key={imgId}><img src={"https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/" + imgId} alt={"A picture of " + bud.name + "." + imgId} style={{ aspectRatio: 1 / 1 }} /> </Carousel.Item>)
                        : <></>
                }
            </Carousel>
            : <img src={"https://raw.githubusercontent.com/CS571-S25/hw5-api-static-content/main/cats/" + bud.imgIds[0]} alt={"A picture of " + bud.name} style={{ aspectRatio: 1 / 1 }} />
        }

        <h2>{bud.name}</h2>

        {showInfo ? (
            < div >
                <p>{bud.gender}</p>
                <p>{bud.breed}</p>
                <p>{bud.age} old</p>
                <p>{bud.description}</p>
            </div>
        ) : <></>}

        {bud.available ?
            <div>
                <Button variant="primary" onClick={() => setShowInfo(!showInfo)}>{showInfo ? "Show Less" : "Show More"}</Button>
                <Button variant="secondary" onClick={() => saveToBasket(bud.name, bud.id)}>Save</Button>
            </div> :
            <div>
                <Button variant="secondary" onClick={() => remove(bud.name, bud.id)}>Unselect</Button>
                <Button variant="success" onClick={() => adoptCat(bud.name, bud.id)}>Adopt</Button>
            </div>

        }
    </Card >
}

export default BadgerBudSummary;