import { ListGroup } from "react-bootstrap";

const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        {
            <>
                <p><strong>{props.major}</strong></p>
                <p>{props.name.first} is taking {props.numCredits} credits and is {props.fromWisconsin ? "" : "NOT"} from Wisonsin.</p>
                <p>They have {props.interests.length} interests{props.interests.length === 0 ? "." : " including..."}</p>
                <ul>
                    {
                        props.interests.length > 0 ? props.interests.map(intrst => <li key={intrst}>{intrst}</li>) : <></>
                    }
                </ul>
            </>
        }
    </div>
}

export default Student;