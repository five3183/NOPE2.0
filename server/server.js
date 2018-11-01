require('dotenv').config()
const path = require("path")
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const resturants = require('./routes/api/resturant')
const user = require('./routes/api/user')

const app = express();
const PORT = process.env.PORT || 3000

//SET STATIC FOLDER 
app.use(express.static(path.join(__dirname, '../client/public')))

//BODYPARSER CHEAT CODES
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROUTES
app.use('/api/resturant', resturants)
app.use('/api/user', user)


mongoose.connect(process.env.MONGODB_URI)
   .then(console.log('Connected'))
   .catch(err => {
      console.log(err)
   })

app.listen(PORT, () => {
   console.log(`Server listening on port ${PORT}!`)
})