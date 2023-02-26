const express = require('express')
const personsRouter = express.Router()
const Person = require('../models/person')
const { checkIfPersonExists } = require('../utils/helpers')

//GET all persons
personsRouter.get('/', (req, res, next) => {
  console.log('inside all person')
  Person.find({})
    .then((people) => {
      res.json(people)
    })
    .catch((error) => next(error))
})

// GET single person
personsRouter.get('/:id', (req, res, next) => {
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
personsRouter.delete('/:id', (req, res, next) => {
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
personsRouter.post('/', async (req, res, next) => {
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
personsRouter.put('/:id', (req, res, next) => {
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

module.exports = personsRouter