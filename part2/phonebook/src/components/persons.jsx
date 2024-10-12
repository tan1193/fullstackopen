import service from '../services/persons'
const Person = ({ person }) => {
    return (
        <div>
            {person.name} {person.number} <button onClick={() => deletePerson()}>delete</button>
        </div>
    )
}

const Persons = (props) => {

    return (
        <div>
            {props.persons.map(
                person => <div key={person.id}>{person.name} {person.number} <button onClick={() => props.deletePerson(person.id)}>delete</button></div>
        )}
        </div>
    )

}



export default Persons