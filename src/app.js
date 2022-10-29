const express = require('express')
const cors = require('cors')
const router = require('./routers/routers')

const app = express()

app.use(router)
app.use(cors)
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.listen(3333, () => console.log('Monitor SSH is Running...'))

