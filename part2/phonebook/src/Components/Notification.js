import React from "react";

const Notification = ({ message = {} }) => {
  return (
    <div className={`notification ${message.type}`}>{message.description}</div>
  );
};

export default Notification;
