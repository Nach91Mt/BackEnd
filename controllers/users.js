const usersRouter = require('express').Router()
const User = require('../Models/User')
const bcrypt = require('bcrypt')

console.log('aaaa')
usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('notes', {
        content: 1,
        date: 1,
        _id: 0
    })
    response.json(users)
})
usersRouter.post('/', async (request, response) => {
    const { body } = request
    const { username, name, password } = body
    const passwordHas = await bcrypt.hash(password, 10)
    const user = new User({
        username,
        name,
        passwordHas: passwordHas
    })
    const saveUser = await user.save()
    response.json(saveUser)
})

module.exports = usersRouter