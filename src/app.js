const express = require('express')
const router = require('./routers/routers')

const app = express()

app.use(router)
app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.listen(3333, () => console.log('Sever is running...'))

