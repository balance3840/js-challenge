const path = require('path')

const ABSENCES_PATH = path.join(__dirname, '../json_files', 'absences.json')
const MEMBERS_PATH = path.join(__dirname, '../json_files', 'members.json')

module.exports = {
    ABSENCES_PATH,
    MEMBERS_PATH
}