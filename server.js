require('dotenv').config()
const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const PORT = process.env.PORT || 3000

//parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));


// ROUTES 
app.use('/', express.static(path.join(__dirname, "./client/public/")))

const routes = require('./server/routes/routes')
app.use('/routes', routes)



// SET SERVER TO LISTEN
app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}!`)
   mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
      .then(console.log('Connected'))
      .catch(err => {console.log(err)})
})

const db = mongoose.connection

db.on('error', (err) => console.log(err))

db.once('open', () => {
   (routes)(app)
})