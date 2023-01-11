import React from "react";

const PersonForm = ({ name, number, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name:
        <input name="name" value={name} onChange={onChange} />
      </div>
      <div>
        number:
        <input name="number" value={number} onChange={onChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
