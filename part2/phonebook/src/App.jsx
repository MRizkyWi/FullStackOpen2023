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
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        updatePerson(personsFilter[0].id, newNumber)
        return
      }
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
    const person = findPerson(id)
    if (window.confirm(`Delete ${person.name}?`)) {
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

  const updatePerson = (id, newNumber) => {
    const person = findPerson(id)
    const changedPerson = {...person, number: newNumber}

    personService
      .update(id, changedPerson)
      .then(returnedPerson => setPersons(persons.map(person => person.id !== id ? person : returnedPerson)))
      .catch(error => {
        console.log(error)
        alert(`person ${person.name} was already deleted from the server`)
        setPersons(persons.filter(person => person.id !== id))
      })
  }
  
  const findPerson = id => {
    return persons.find(person => person.id === id)
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