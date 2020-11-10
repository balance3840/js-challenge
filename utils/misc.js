const fs = require('fs')

/**
 * @param  {array} arr Original array
 * @param  {string} key Key to filter
 */
const getUniqueArray = (arr, key) => arr.reduce((acc, current) => {
    const x = acc.find(item => item[key] === current[key])
    if (!x) {
        return acc.concat([current])
    } else {
        return acc
    }
}, [])

/**
 * @param  {string} path Local path to file
 */
const readJsonFile = (path) => new Promise((resolve) => fs.readFile(path, 'utf8', (_, data) => resolve(data)))
    .then((data) => JSON.parse(data))
    .then((data) => data.payload)

module.exports = {
    getUniqueArray,
    readJsonFile
}