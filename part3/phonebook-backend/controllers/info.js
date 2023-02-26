const infoRouter = require('express').Router()
const Person = require('../models/person')

//GET info for phonebook entries and request time
infoRouter.get('/', (req, res, next) => {
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

module.exports = infoRouter