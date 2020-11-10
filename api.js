const { ABSENCES_PATH, MEMBERS_PATH } = require('./utils/conts')
const { compareDates } = require('./utils/date')
const { getUniqueArray, readJsonFile } = require('./utils/misc')

const members = () => readJsonFile(MEMBERS_PATH)

const getMember = userId => members().then(members => members.filter(x => x.userId === userId)[0])

const getMemberAbsences = userId => absences().then(absences => absences.filter(x => x.userId === userId))

const absences = () => readJsonFile(ABSENCES_PATH)

const getAbsencesByDates = (startDate, endDate) => absences().then(absences => {
  return absences.filter(x => {
    if (startDate && endDate) {
      return [0, 1].includes(compareDates(x.startDate, startDate)) && [0, -1].includes(compareDates(x.endDate, endDate))
    }
    else if (startDate) return [0, 1].includes(compareDates(x.startDate, startDate))
    else return [0, -1].includes(compareDates(x.endDate, endDate))
  })
})

const getVacationAbsences = () => absences().then(absences => absences.filter(x => x.type === 'vacation'))
  .then(absences => getUniqueArray(absences, 'userId'))

const getSicknessAbsences = () => absences().then(absences => absences.filter(x => x.type === 'sickness'))
  .then(absences => getUniqueArray(absences, 'userId'))

module.exports = {
  members,
  absences,
  getMember,
  getAbsencesByDates,
  getVacationAbsences,
  getSicknessAbsences,
  getMemberAbsences
}