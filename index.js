const express = require('express')
const app = express()

const logger = require('./loggerMidelware')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(logger)


let notes = [
    {
        id: 1,
        content: 'HTML is eassyyyyy facil',
        important: true
    },
    {
        id: 2,
        content: 'Browser can execute only JavaScript',
        important: false
    },
    {
        id: 3,
        content: 'GET and POST are the most important methods of HTTP protocol',
        important: true
    }
]

/*const app = http.createServer((rquest, response) => {
    response.writeHead(200, { 'content-type': 'application/json' })
    response.end(JSON.stringify(notes))
})*/
app.get('/', (request, response) => {
    response.send('<h1>hola rey mio</h1>')
})

app.get('/notes', (rquest, response) => {
    response.json(notes)
})
app.get('/notes/:id', (rquest, response) => {
    const id = Number(rquest.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})
app.delete('/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

app.post('/notes/post', (request, response) => {
    const note = request.body

    if (!note || !note.body) {
        response.status(400)
    } else {

        const ids = notes.map(note => note.id)
        const maxId = Math.max(...ids)
        const newNote = {
            id: maxId + 1,
            content: note.body,
            important: typeof note.important !== 'undefined' ? note.important : false
        }
        notes = [...notes, newNote]
        //console.log(newNote)
        response.status(201).json(newNote)
    }


})



app.use((rquest, response) => {
    response.status(404).json({
        error: 'not found'
    })
})

const PORT = 3002
app.listen(PORT, () => {
    console.log('Server running o port ' + PORT)
})