const mongoose = require('mongoose')
const { model, Schema } = mongoose;
const userSchema = new Schema({
    username: String,
    name: String,
    passwordHas: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHas
    }
})

const User = model('User', userSchema)
module.exports = User