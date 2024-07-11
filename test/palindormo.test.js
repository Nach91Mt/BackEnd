const { palindromo } = require('./palindromos.js')

test('palindrome of nacho', () => {
    const result = palindromo('hola')

    expect(result).toBe('aloh')
})
test('palindrme of empty string', () => {
    const result = palindromo('')

    expect(result).toBe('')
})
test('palindrme of undefined ', () => {
    const result = palindromo('')

    expect(result).toBe('')
})