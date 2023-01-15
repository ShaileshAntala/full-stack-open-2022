import { useEffect, useState } from "react";
import phonebookService from "./Services/phonebookService";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    phonebookService
      .getAllContacts()
      .then((initialPersons) => setPersons(initialPersons));
  }, []);

  const showAll = filter ? false : true;

  const namesToShow = showAll
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const setNotificationData = (type, description) => {
    setMessage({
      type,
      description,
    });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

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
    const isNameDuplicate = persons.find(
      (person) =>
        person.name.toLocaleLowerCase() === newPerson.name.toLocaleLowerCase()
    );
    return isNameDuplicate;
  };

  const updatePerson = (existingPerson) => {
    const text = `${existingPerson.name} is already added to phonebook, replace the old number with a new one`;
    const updatedPerson = { ...existingPerson, number: newNumber };
    if (window.confirm(text)) {
      phonebookService
        .updateContact(existingPerson.id, updatedPerson)
        .then((response) => {
          setPersons(
            persons.map((person) =>
              person.id !== existingPerson.id ? person : response
            )
          );
          setNotificationData("success", `Updated ${response.name}`);
          setNewName("");
          setNewNumber("");
        })
        .catch(() =>
          setNotificationData(
            "error",
            `Information of ${existingPerson.name}' has already been removed from server`
          )
        );
    }
    setNewName("");
    setNewNumber("");
  };

  const addPhone = (e) => {
    e.preventDefault();
    const newPerson = { name: newName, number: newNumber };
    const isExists = isDuplicateContact(newPerson);
    if (isExists) {
      updatePerson(isExists);
    } else {
      phonebookService
        .addContact(newPerson)
        .then((response) => {
          setPersons(persons.concat(response));
          setNotificationData("success", `Added ${response.name}`);
          setNewName("");
          setNewNumber("");
        })
        .catch(() =>
          setNotificationData(
            "error",
            `Problem adding ${newName}, please try again`
          )
        );
    }
  };

  const deletePhone = (id, name) => {
    const text = `Delete ${name}`;
    if (window.confirm(text)) {
      phonebookService
        .deleteContact(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setNotificationData(
            "success",
            `${name}' has been removed from server`
          );
        })
        .catch(() =>
          setNotificationData(
            "error",
            `Information of ${name}' has already been removed from server`
          )
        );
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {message && <Notification message={message} />}
      <Filter value={filter} handleChange={handleChange} />
      <h1>add a new</h1>
      <PersonForm
        name={newName}
        number={newNumber}
        onChange={handleChange}
        onSubmit={addPhone}
      />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} deletePhone={deletePhone} />
    </div>
  );
};

export default App;
