
const express = require('express');
const connect = require('./db/db')
const app = express();
const router = require('./controller/uploadimage')
const port = process.env.PORT | 300;

app.use('./uploads/',express.static('uploads'))
app.use(express.urlencoded({extended:false}))
app.use(express.json());
//general router were import inside app
app.use('/api', router)



connect.connect((err)=>{
    if(err) throw err;
    app.listen('300', ()=>{
        console.log("database is connected " + port)
    })
})
