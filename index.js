require('dotenv').config()
const express = require('express')
const app = express()
const logger = require('./loggerMidelware.js')
const cors = require('cors')
require('./mongo.js')
const Note = require('./Models/Note.js')
const handleErrors = require('./middleware/handleErrors.js')
const notFound = require('./middleware/notFound.js')
const usersRouter = require('./controllers/users.js')
const User = require('./Models/User.js')
const loginRouter = require('./controllers/login.js')
const userExtractor = require('./middleware/userExtractor.js')
app.use(cors())
app.use(express.json())
app.use(logger)


let notes = []

// const app = http.createServer((rquest, response) => {
//     response.writeHead(200, { 'content-type': 'application/json' })
//     response.end(JSON.stringify(notes))
// })
app.get('/', (request, response) => {
    response.send('<h1>hola rey mio</h1>')
})

app.get('/notes', async (request, response) => {
    const notes = await Note.find({}).populate('user', { name: 1, _id: 0 })
    response.json(notes)


})
app.get('/notes/:id', (request, response, next) => {
    const id = request.params.id
    Note.findById(id).then(notes => {
        if (notes) {
            response.json(notes)
        } else {
            response.status(404).end()
        }
        /*return note
            ? response.json(note):
            response.status(404).end()
             */
    }).catch(err => {
        next(err)
    })
})
app.delete('/notes/:id', userExtractor, (request, response, next) => {
    const id = request.params.id
    Note.findByIdAndDelete(id).then(() => {
        console.log('boorado')
        response.status(204).end()
    }).catch(err => next(err))
})
app.put('/notes/:id', userExtractor, (request, response, next) => {
    const { id } = request.params
    const note = request.body
    const newNoteInfo = {
        content: note.content,
        important: note.important
    }

    Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
        .then(result => {
            response.json(result)
        }).catch(err => next(err))
})

app.post('/notes/postear', userExtractor, async (request, response) => {
    const { content, important = false } = request.body
    const { userId } = request

    const user = await User.findById(userId)
    console.log(user._id)
    if (!content) {
        response.status(400).json({
            error: 'required "content" field is missing'
        })
    } else {
        console.log('esto ' + content)
        const newNote = new Note({
            content,
            date: new Date(),
            important,
            user: user._id

        })
        // newNote.save().then(savenote => {
        //     console.log('guardada')
        //     response.status(201).json(savenote)
        // })
        const saveNote = await newNote.save()
        user.notes = user.notes.concat(saveNote._id)
        await user.save()
        response.json(saveNote)
    }


})
app.use('/user', usersRouter)
app.use('/user/login', loginRouter)
app.use(notFound)


app.use(handleErrors)

const PORT = process.env.PORT || 3002
console.log(PORT)
app.listen(PORT, () => {
    console.log('Server running o port ' + PORT)
})
