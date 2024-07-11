module.exports = (request, response, next) => {
    console.log('entro')
    response.status(404).end()
}