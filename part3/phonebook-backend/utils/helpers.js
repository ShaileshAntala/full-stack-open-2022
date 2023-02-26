const Person = require('../models/person')

const checkIfPersonExists = async (newPerson) => {
  const data = await Person.find({})
  const isExisting = data.some(
    (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
  )
  return isExisting
}

module.export = {
  checkIfPersonExists
}
