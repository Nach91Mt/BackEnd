const mongoose = require('mongoose')
const { model, Schema } = mongoose;
const noteSchema = new Schema({
    content: String,
    date: Date,
    important: Boolean,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v

    }
})

const Note = mongoose.model('Note', noteSchema);

module.exports = Note