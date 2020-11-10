const express = require('express')
const app = express()
const port = process.env.port || 3000

app.set('view engine', 'ejs')

app.get(['/', '/absences'], async (req, res) => {
    res.render('pages/index')
})

app.listen(port, () => console.log(`App listening on port ${port}`))