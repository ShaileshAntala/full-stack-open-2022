require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

const PORT = process.env.PORT || 3001

// eslint-disable-next-line no-unused-vars
morgan.token('data', function (req) {
  if (req.method === 'POST') {
    return JSON.stringify(req.body)
  }
  if (req.method === 'PUT') {
    return JSON.stringify(req.body)
  }
  return
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :data')
)

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const checkIfPersonExists = async (newPerson) => {
  const data = await Person.find({})
  const isExisting = data.some(
    (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
  )
  return isExisting
}

// health check
app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))

//GET all persons
app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.json(people)
    })
    .catch((error) => next(error))
})

//GET info for phonebook entries and request time
app.get('/info', (req, res, next) => {
  Person.find({})
    .then((people) => {
      const totalPersons = people.length
      const reqTime = new Date()
      res.send(
        `<p>Phonebook has info for ${totalPersons} people</p> \n ${reqTime}`
      )
    })
    .catch((error) => next(error))
})

//GET single person
app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

//DELETE person
app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      if (result) {
        res.status(204).end()
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

//POST person : adding person
app.post('/api/persons', async (req, res, next) => {
  const newPerson = req.body
  if (!newPerson.name || !newPerson.number) {
    return res.status(400).json({
      error: 'name or number is missing',
    })
  } else {
    const isExisting = await checkIfPersonExists(newPerson)
    if (isExisting) {
      res
        .status(400)
        .send({ error: `${newPerson.name} already exists in phonebook!` })
    } else {
      const person = new Person({
        name: newPerson.name,
        number: newPerson.number,
      })

      person
        .save()
        .then((savedPerson) => {
          res.json(savedPerson)
        })
        .catch((error) => next(error))
    }
  }
})

//PUT person : update person
app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(req.params.id, person, {
    new: true,
    runValidators: true,
    context: 'query',
  })
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson)
      } else {
        res.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.use(unknownEndpoint)

app.use(errorHandler)

// Server listening to requests on port 3001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
