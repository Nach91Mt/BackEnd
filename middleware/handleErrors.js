
const ERROR_HANDLERS = {
    CastError: res =>
        res.status(400).send({ error: ' id used is malformed' }),
    JsonWebTokenError: (res, error) => {
        res.status(401).json({ error: 'token missing or invalid' })
    },
    TokenExpireError: res =>
        res.status(401).json({ error: 'token expired' }),
    defaultError: res => res.status(500).end()
}
// if (error.name === 'CastError') {
//     response.status(404).json({
//         error: 'not found'
//     })
// } else if (error.name === 'JsonWebTokenError') {
//     response.status(401).json({ error: 'token missing or invalid' })
// } else {
//     response.status(500).end()
// }

module.exports = (error, request, response, next) => {
    console.log(error.name)
    const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError
    handler(response, error)
}