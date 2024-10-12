import { useEffect, useState } from 'react'
import Persons from './components/persons'
import PersonForm from './components/personForm'
import Filter from './components/filter'
import personService from './services/persons'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filter, setFilter] = useState('')
  const personsToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    // axios
    //   .get('http://localhost:3001/persons')
    //   .then(response => {
    //     console.log('promise fulfilled')
    //     setPersons(response.data)
    //   })
    personService.getAll().then((res) => {
      setPersons(res)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(person => person.name === newName)
        const changedPerson = { ...person, number: newNumber }
        personService.update(person.id, changedPerson).then((res) => {
          setPersons(persons.map(person => person.id !== res.id ? person : res))
          setNewName('')
          setNewNumber('')
        })
      }
      return
    }
    personService.create(personObject).then((res) => {
      setPersons(persons.concat(res))
      setNewName('')
      setNewNumber('')
    })

  }

  const handlePersonChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleShowChange = (event) => {
    setFilter(event.target.value)
    setShowAll(!event.target.value)
  }
  
  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id).then((res) => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }
  
    return (
      <div>
        <h2>Phonebook</h2>
        <Filter filter={filter} handleShowChange={handleShowChange} />
        <h2>add a new</h2>
        <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

        <h2>Numbers</h2>
        <ul>
          <Persons persons={personsToShow} deletePerson={deletePerson}  />
        </ul>
      </div>
    )
  }

  export default App