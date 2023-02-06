
const express = require('express');
const connect = require('./db/db')
const app = express();
const BLOG_ROUTING = require('./controller/uploadimage');
const  API_ROUTER = require('./router/index')
const cors = require('cors');
const port = process.env.PORT | 300;

// app.use('./uploads/',express.static('uploads'))
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(cors({origin:'*'}))
//general router were import inside app

app.use('/api',API_ROUTER)
app.use('/api',BLOG_ROUTING)
//(component) QuillEditorComponent.....




connect.connect((err)=>{
    if(err) throw err;
    app.listen('300', ()=>{
        console.log("database is connected " + port)
    })
})
