const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;

morgan.token("data", function (req, res) {
  if (req.method === "POST") {
    return JSON.stringify(req.body);
  }
  return;
});

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const generateId = () => {
  const id = Math.floor(Math.random() * 1000);
  return id;
};

const isExistingPerson = (newPerson) => {
  const isNameExist = data.some(
    (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
  );
  if (isNameExist) {
    return true;
  }
  return false;
};

// health check
app.get("/", (req, res) => res.send("<h1>Hello World!</h1>"));

//GET all persons
app.get("/api/persons", (req, res) => {
  res.json(data);
});

//GET info for phonebook entries and request time
app.get("/info", (req, res) => {
  const totalPersons = data.length;
  const reqTime = new Date();
  res.send(
    `<p>Phonebook has info for ${totalPersons} people</p> \n ${reqTime}`
  );
});

//GET single person
app.get("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  const personData = data.find((person) => person.id === personId);
  if (personData) {
    res.json(personData);
  } else {
    res.statusMessage = "No Record Found";
    res.status(404).end();
  }
});

//DELETE person
app.delete("/api/persons/:id", (req, res) => {
  const personId = Number(req.params.id);
  const personData = data.find((person) => person.id === personId);
  if (personData) {
    data = data.filter((person) => person.id !== personId);
    res.status(204).end();
  } else {
    res.statusMessage = "No Record Found";
    res.status(404).end();
  }
});

//POST person : adding person
app.post("/api/persons", (req, res) => {
  let newPerson = req.body;
  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({
      error: "name or number is missing",
    });
  } else if (isExistingPerson(newPerson)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  } else {
    newPerson = { ...newPerson, id: generateId() };
    console.log("this was run first");
    data = data.concat(newPerson);
    res.json(newPerson);
  }
});

// Server listening to requests on port 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
