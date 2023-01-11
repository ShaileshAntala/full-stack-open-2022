import React from "react";

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const Persons = ({ namesToShow }) => {
  return (
    <>
      {namesToShow.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </>
  );
};

export default Persons;
