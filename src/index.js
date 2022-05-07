const express = require('express') 
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

const route = require('./route/route')

const app = express()


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://sohel:India123@cluster0.v2okl.mongodb.net/group68Database", {useNewUrlParser:true})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});

