
const express = require('express');
const connect = require('./db/db')
const app = express();
const BLOG_ROUTING = require('./controller/uploadimage');
const  API_ROUTER = require('./router/index')
const cors = require('cors');
const port = process.env.PORT | 300;
const bodyParser = require('body-parser')

// app.use('./uploads/',express.static('uploads'))
app.use(express.urlencoded({extended:false}))
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


// parse application/json
app.use(bodyParser.json())
app.use(cors({origin:'*'}))
//general router were import inside app

app.use('/api',API_ROUTER)
app.use('/api',BLOG_ROUTING)






connect.connect((err)=>{
    if(err) throw err;
    app.listen('300', ()=>{
        console.log("database is connected " + port)
    })
})
