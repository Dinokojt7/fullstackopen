import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const [showAll, setShowAll] = useState(true);

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
      id: persons.length + 1,
    };

    const exists = persons.some((person) => person.name === newName);

    if (!exists) {
      setPersons(persons.concat(newEntry));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} is already added to phonebook`);
    }
  }

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
      <Persons personShowing={personShowing} />
    </div>
  );
};

export default App;
