const { ABSENCES_PATH, MEMBERS_PATH } = require('./utils/conts')
const { compareDates } = require('./utils/date')
const { getUniqueArray, readJsonFile } = require('./utils/misc')

/**
 * @returns Array of members
 */
const members = () => readJsonFile(MEMBERS_PATH)

/**
 * @param {number} userId Id of the member
 * @returns Array of members
 */
const getMember = userId => members().then(members => members.filter(x => x.userId === userId)[0])


/**
 * @param {number} userId Id of the member
 * @returns Array of absences of specific member
 */
const getMemberAbsences = userId => absences().then(absences => absences.filter(x => x.userId === userId))


/**
 * @returns Array of absences
 */
const absences = () => readJsonFile(ABSENCES_PATH)


/**
 * @param {string} startDate Initial date
 * @param {string} endDate Final date
 * @returns Array of absences
 */
const getAbsencesByDates = (startDate, endDate) => absences().then(absences => {
  return absences.filter(x => {
    if (startDate && endDate) {
      return [0, 1].includes(compareDates(x.startDate, startDate)) && [0, -1].includes(compareDates(x.endDate, endDate))
    }
    else if (startDate) return [0, 1].includes(compareDates(x.startDate, startDate))
    else return [0, -1].includes(compareDates(x.endDate, endDate))
  })
})

/**
 * @returns Array of vacation absences
 */
const getVacationAbsences = () => absences().then(absences => absences.filter(x => x.type === 'vacation'))
  .then(absences => getUniqueArray(absences, 'userId'))

  
/**
 * @returns Array of sick absences
 */
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