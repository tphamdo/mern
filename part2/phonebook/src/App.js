import { useState, useEffect } from 'react'
import phonebookSerivce from './services/phonebook'
import Notification from './components/Notification'
import MessageType from './MessageType'

const Filter = ({text, onChange, filter}) => {
  return (
    <div>
      {text} <input onChange={onChange} value={filter}/>
    </div>
  )
}

const PersonForm = ({onSubmit, newNumber, handleNewNumber, newName, handleNewName}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={handleNewName} value={newName}/>
      </div>
      <div>
        number: <input onChange={handleNewNumber} value={newNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const FilteredPersons = ({persons, newFilter, handleDelete}) => {
  const regexFilter = new RegExp(newFilter, "gi")
  return (
    persons
      .filter(person => person.name.search(regexFilter) !== -1)
      .map(person => 
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={handleDelete(person.id)}>delete</button>
        </div>
      )
  )
}
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(
    { text: null, messageType: null }
  )
  // const [messageType, setMessageType] = useState(null)

  const handleNewFilter = (event) => setNewFilter(event.target.value)
  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()

    phonebookSerivce
      .getAll().then(returnedPersons => {
        console.log('8888', returnedPersons)
        const lst = returnedPersons.filter(person => person.name === newName)
        if (lst.length !== 0) {
          console.log(lst)
          const person = lst[0]
          if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with the new one?`)) {
            const updatedPerson = { ...person, number:newNumber } 
            phonebookSerivce
              .put(updatedPerson.id, updatedPerson)
              .then(returnedPerson => {
                setPersons(returnedPersons.map(person => person.id !== updatedPerson.id? person : returnedPerson))
                setNewName('')
                setNewNumber('')
              })
              .catch(_ => {
                console.log("here")
                setMessage({ 
                  ...message,
                  text:`${person} has already been deleted from the phonebook`,
                  messageType: MessageType.ERROR 
                })
                setTimeout(() => {
                  setMessage({...message, text:null, messageType:null})
                }, 5000)
                setPersons(persons.filter(person => person.id !== updatedPerson.id))
              })
          }
        } else {
          const newPerson = { name: newName, number: newNumber } 
          phonebookSerivce
            .create(newPerson)
            .then(returnedPerson => {
              setPersons(returnedPersons.concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              setMessage({
                ...message,
                text: `${newName} was successfully added`,
                messageType: MessageType.SUCCESS
              })
              setTimeout(() => {
                setMessage({
                  ...message,
                  text: null,
                  messageType: null
                })
              }, 5000)
            })
        }
      })
    }

  const handleDelete = (id) => {
    const filteredPerson = persons.filter(person => person.id != id)
    const personName = filteredPerson[0].name

    return () => {
      phonebookSerivce
        .remove(id)
        .catch(_ => {
          console.log('errrrr')
          setMessage({
            ...message,
            text:`Information of ${personName} has already been deleted from the phonebook`,
            messageType: MessageType.ERROR
          })
          setTimeout(() => {
            setMessage({
              ...message,
              text: null,
              messageType: null
            })
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
          setNewName('')
          setNewNumber('')
        })
      setPersons(persons.filter(person => person.id !== id))
    }
  }

  useEffect(() => {
    phonebookSerivce
      .getAll()
      .then(returnedPerson => {
        setPersons(returnedPerson)
      })
  }, [])

  return (
    <div>
    <h2>Phonebook</h2>
    <Notification message={message} />
    <Filter text='filter show with' onChange={handleNewFilter} filter={newFilter} />
    <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} handleNewName={handleNewName} 
        handleNewNumber={handleNewNumber} newName={newName} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <FilteredPersons persons={persons} newFilter={newFilter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App
