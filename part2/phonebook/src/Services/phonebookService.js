import axios from "axios";

const baseURL = "/api/persons";

const getAllContacts = () => {
  const request = axios.get(baseURL);
  return request.then((response) => response.data);
};

const addContact = (person) => {
  const request = axios.post(baseURL, person);
  return request.then((response) => response.data);
};

const updateContact = (id, updatedPerson) => {
  const request = axios.put(`${baseURL}/${id}`, updatedPerson);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then((response) => response.data);
};

const phonebookService = {
  getAllContacts,
  addContact,
  updateContact,
  deleteContact,
};

export default phonebookService;
