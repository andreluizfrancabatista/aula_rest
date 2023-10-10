const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const mongoString = process.env.DATABASE_URL

mongoose.connect(mongoString)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database conectado')
})

const app = express()
app.use(express.json())

const routes = require('./routes/routes')
app.use('/api', routes)

app.listen(3000, () => {
    console.log(`Server running...`)
})