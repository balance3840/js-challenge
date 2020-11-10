const compareDates = (startDate, endDate) => {
    startDate = new Date(startDate).getTime()
    endDate = new Date(endDate).getTime()

    if(startDate > endDate) return 1
    else if(startDate < endDate) return -1
    else return 0
}

const isAValidDate = date => {
    return !isNaN(new Date(date).getTime())
}

module.exports = {
    compareDates,
    isAValidDate
}