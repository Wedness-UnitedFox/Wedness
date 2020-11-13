const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')

app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use(routes)
// app.post('/login', (req, res) => {
//   const { email, password } = req.body
//   res.status(200).json({ email })
// })

app.listen(port , () => {
  console.log(`app is listening on ${port}`)
})

module.exports = app
