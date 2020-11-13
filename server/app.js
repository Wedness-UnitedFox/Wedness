const express = require('express')
const app = express()
const routes = require('./routes')
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// app.get('/', function(req, res) {
//     res.status(200).json('Hello world');
//   });

app.use(routes)

// app.listen(port, ()=> {
//     console.log(`App listen on port: ${port}`)
// })

module.exports = app