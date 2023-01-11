import { useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const showAll = filter ? false : true;

  const namesToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const handleChange = (e) => {
    const name = e.target.name;
    if (name === "name") {
      setNewName(e.target.value);
    } else if (name === "number") {
      setNewNumber(e.target.value);
    } else {
      setFilter(e.target.value);
    }
  };

  const isDuplicateContact = (newPerson) => {
    const isNameDuplicate = persons.some(
      (person) =>
        person.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase()
    );
    const isNumberDuplicate = persons.some(
      (person) => person.number === newPerson.number
    );
    if (isNameDuplicate && isNumberDuplicate) {
      return `${newPerson.name} ${newPerson.number} already exists in phonebook`;
    } else if (isNameDuplicate) {
      return `${newPerson.name} already exists in phonebook`;
    } else if (isNumberDuplicate) {
      return `${newPerson.number} already exists in phonebook`;
    }
    return false;
  };

  const addPhone = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const isExists = isDuplicateContact(newPerson);
    if (isExists) {
      alert(isExists);
    } else {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={handleChange} />
      <h1>add a new</h1>
      <PersonForm
        name={newName}
        number={newNumber}
        onChange={handleChange}
        onSubmit={addPhone}
      />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} />
    </div>
  );
};

export default App;
