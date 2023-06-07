const express = require('express')
const { dbConnection } = require('./database/config')
const cors = require('cors')
const app = express()

require('dotenv').config();

app.use(express.static('public'))

app.use(express.json())

dbConnection()

app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))



app.listen(process.env.PORT, () =>  console.log('Servidor corriendo' + process.env.PORT))