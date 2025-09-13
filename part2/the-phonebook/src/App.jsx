import { useState } from "react";

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
      filter shown with <input value={searchName} onChange={handleSearch} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameInput} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personShowing.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
