const supertest = require("supertest")
const mongoose = require('mongoose')
const { response } = require("express")
const Note = require('../Models/Note.js')
const api = supertest(app)
const { initialNotes } = require('./helper.js')
beforeEach(async () => {
    await Note.deleteMany({})

    for (let note of initialNotes) {
        const noteObject = new Note(note)
        await noteObject.save()
    }
    // const note1 = new Note(initialNotes[0])
    // await note1.save()

    // const note2 = new Note(initialNotes[1])
    // await note2.save()

})
test('notes are returned as json', async () => {
    await api
        .get('/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('the first note is hola', async () => {
    const response = await api.get('/notes')
    expect(response.body[0].content).toBe('hola')
})
test('the first note is adios', async () => {
    const response = await api.get('/notes')
    const contents = response.body.map(note => note.content)
    expect(contents).toContain('adios')
})
test('notes are returned a two', async () => {
    const response = await api.get('/notes')
    expect(response.body).toHaveLength(3)
})
afterAll(() => {
    server.close()
    mongoose.connection.close()
})


