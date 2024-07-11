const User = require('../Models/User.js')
const bcrypt = require('bcrypt')
describe('creatins new user', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHas = await bcrypt.hash('12345', 10)

        const user = ({ username: 'nacho', name: 'chacho', passwordHas })
        await user.save()
    })
    test('works as expected creating a fres username', async () => {
        const usersDB = await User.find({})
        const usersAdStart = userDb.map(user => user.toJSON())

        const newuser = {
            username: 'chacho',
            name: 'pollo',
            password: '1234'
        }
    })
})