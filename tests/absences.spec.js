const assert = require('assert')
const { absences: getAbsences, getMemberAbsences, getAbsencesByDates } = require('../api')
const { compareDates } = require('../utils/date')
require('chai').should()

describe('absences test', () => {

  describe('Is returning all absences', () => {
    it('42 abscences', async () => {
      const absences = await getAbsences()
      absences.should.have.length(42)
    })
  })

  describe('Is returning the absences of a specific user', () => {
    it('userId = 5293', async () => {
      const userId = 5293
      const absences = await getMemberAbsences(userId)
      absences.every(absence => assert(absence.userId === userId))
    })
  })

  describe('Is returning the absences of a specific date range', () => {
    it('From 2017-03-13 to 2017-03-15', async () => {
      const startDate = '2017-03-13'
      const endDate = '2017-03-15'
      const absences = await getAbsencesByDates(startDate, endDate)
      absences.every(absence => {
        return assert([0, 1].includes(compareDates(absence.startDate, startDate)) && 
               [0, -1].includes(compareDates(absence.endDate, endDate)))
      })
    })
  })

})


