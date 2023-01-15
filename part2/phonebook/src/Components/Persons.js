import React from "react";

const Person = ({ person, deletePhone }) => {
  return (
    <p>
      {person.name} {person.number}
      <button onClick={() => deletePhone(person.id, person.name)}>
        delete
      </button>
    </p>
  );
};

const Persons = ({ namesToShow, deletePhone }) => {
  return (
    <>
      {namesToShow.map((person) => (
        <Person key={person.id} person={person} deletePhone={deletePhone} />
      ))}
    </>
  );
};

export default Persons;
