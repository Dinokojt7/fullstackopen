import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneBookService from "./services/phoneBookService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    phoneBookService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
    });
  }, []);

  function handleNameInput(event) {
    setNewName(event.target.value);
  }

  function handleNumberInput(event) {
    setNewNumber(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const newEntry = {
      name: newName,
      number: newNumber,
    };

    const exists = persons.some((person) => person.name === newName);

    if (!exists) {
      phoneBookService.create(newEntry).then((returnedNumber) => {
        setPersons(persons.concat(returnedNumber));
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const handleDelete = (id) => {
    const targetPerson = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${targetPerson.name}?`)) {
      phoneBookService
        .remove(id)
        .then(() => setPersons(persons.filter((n) => n.id !== id)));
    } else {
      console.log(`${targetPerson.name} remains in the server!`);
    }
  };

  function handleSearch(event) {
    setSearchName(event.target.value);
    setShowAll(false);
  }

  const personShowing = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(searchName.toLowerCase()),
      );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearch={handleSearch} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameInput={handleNameInput}
        newNumber={newNumber}
        handleNumberInput={handleNumberInput}
      />
      <h3>Numbers</h3>
      <Persons personShowing={personShowing} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
