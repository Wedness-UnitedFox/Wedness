const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const routes = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(routes)
app.listen(port , () => {
  console.log(`app is listening on ${port}`)
})

module.exports = app
