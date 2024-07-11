const mongoose = require('mongoose')
const { model, Schema } = mongoose;
const { MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV } = process.env

const conectionString = NODE_ENV === 'test'
    ? MONGO_DB_URI_TEST
    : MONGO_DB_URI
mongoose.connect(conectionString)
    .then(() => {
        console.log('Database connected')

    }).catch(err => {
        console.log(err)
    })

const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean
})

process.on('uncaughtException', () => {
    mongoose.connection.close()
})

/*note.save()
    .then(result => {
        console.log(result)
        mongoose.connection.close()
    }).catch(err => {
        console.log(err)
    })*/
/*
Note.find({}).then(result => {
    console.log(result)
    mongoose.connection.close()
})*/