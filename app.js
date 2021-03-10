require('dotenv').config();
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth')
const shopRoutes = require('./routes/shop')


app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cors())
app.use(authRoutes)
app.use(shopRoutes)

mongoose
    .connect(process.env.MONGODB_URL)
    .then(result => {
        app.listen(3000)
    })
    .catch(err => {
        console.log(err)
    })

    let serverInstance = null;
    module.exports = {
        start: function () {
            serverInstance = app.listen(() => {
                console.log(`Example app listening at http://localhost:${3000}`)
            })
        },
        close: function () {
            serverInstance.close();
        },
 }
