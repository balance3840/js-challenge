/**
 * @param  {string} startDate Initial date
 * @param  {string} endDate Final data
 * @returns If greater than: 1, if lower than: -1, if equal: 0
 */
const compareDates = (startDate, endDate) => {
    startDate = new Date(startDate).getTime()
    endDate = new Date(endDate).getTime()

    if(startDate > endDate) return 1
    else if(startDate < endDate) return -1
    else return 0
}

/**
 * @param  {string} date Date to validate
 */
const isAValidDate = date => {
    return !isNaN(new Date(date).getTime())
}

module.exports = {
    compareDates,
    isAValidDate
}