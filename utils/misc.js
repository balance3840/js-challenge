const fs = require('fs')

const getUniqueArray = (arr, key) => arr.reduce((acc, current) => {
    const x = acc.find(item => item[key] === current[key])
    if (!x) {
        return acc.concat([current])
    } else {
        return acc
    }
}, [])

const readJsonFile = (path) => new Promise((resolve) => fs.readFile(path, 'utf8', (_, data) => resolve(data)))
    .then((data) => JSON.parse(data))
    .then((data) => data.payload)

module.exports = {
    getUniqueArray,
    readJsonFile
}