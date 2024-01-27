import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      }) 
  }, [])  
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personsFilter = persons.filter(person => person.name === newName)
    if (personsFilter.length > 0) {
      alert(`${newName} is already in phonebook`)
      return
    }
    const person = {
      name: newName,
      number: newNumber
    }

    personService
      .create(person)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = id => {
    if (window.confirm(`Delete ${personsFilter.filter((person) => person.id === id)[0].name}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          personService
            .getAll()
            .then(updatedPersons => {
              setPersons(updatedPersons)
            })
        })
    }
  }
  

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsFilter = filter.length === 0
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <Form onSubmit={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {personsFilter.map(
          (person) => 
          <Person 
            key={person.id}
            person={person}
            deletePerson={() => deletePerson(person.id)}
          />
        )}
      </ul>
    </div>
  )
}

export default App