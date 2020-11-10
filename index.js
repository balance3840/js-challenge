const express = require('express')
const app = express()
const port = process.env.port || 3000
const { absences: getAbsences, getMember, getVacationAbsences, getSicknessAbsences, getMemberAbsences, getAbsencesByDates } = require('./api')
const ical = require('ical-generator')
const { isAValidDate, compareDates } = require('./utils/date')
const now = new Date()

app.set('view engine', 'ejs')

app.get(['/', '/absences'], async (req, res) => {
    const { query } = req
    const userId = Number(query.userId) || null
    const startDate = isAValidDate(query.startDate) ? new Date(query.startDate) : null
    const endDate = isAValidDate(query.endDate) ? new Date(query.endDate) : null
    let absences = []

    if(userId) absences = await getMemberAbsences(userId)
    else if(startDate || endDate) absences = await getAbsencesByDates(startDate, endDate)
    else absences = await getAbsences()
    
    const absencesData = await generateAbsencesData(absences)

    res.render('pages/index', { absences: absencesData })
})

app.get('/get-calc', async (req, res) => {
    const cal = ical({ domain: 'localhost.local', name: 'My first ICal' })
    cal.createEvent({
        prodId: {company: 'Crewmeister', product: 'ical-generator'},
        description: 'Absences Ical',
        summary: 'Absences ICal generated from the UI',
        scale: 'gregorian',
        timezone: 'Europe/Berlin',
        url: "http://localhost:3000/",
        location: "Metting room",
        start: now,
        end: new Date(now.getTime() + 3600000)
    })
    res.attachment('abscences.ics')
    res.type('ics')
    res.send(cal.toString())
})

/**
 * @param  {array} absences
 * @returns Array of absences with member attached
 */
const getAbsencesWithMember = async (absences) => {
    const promises =  absences.map(async (absence) => {
        return {
            ...absence,
            member: await getMember(absence.userId)
        }
    })
    return Promise.all(promises)
}

/**
 * @param  {array} absences
 * @returns Array of absences
 */
const generateAbsencesData = async (absences) => {
    let absencesData = await getAbsencesWithMember(absences)
    return absencesData.map(absence => {
        let isAbsent = true

        if(compareDates(now, absence.endDate) === 1 || 
           compareDates(now, absence.startDate) === -1) isAbsent = false

        absence.isAbsent = isAbsent

        return absence
    })
}

app.listen(port, () => console.log(`App listening on port ${port}`))