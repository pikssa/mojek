const express = require('express');
const bodyParser = require('body-parser')
const mongoose=require('mongoose')
const route = require('./routes/route')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://lddu818:27o3D6VwW2z1zHMj@cluster0.6gomf.mongodb.net/sip-db?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(3000)
    console.log('Express app running on port ' + (process.env.PORT || 3000))