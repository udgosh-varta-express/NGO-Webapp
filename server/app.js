/**
 * @const
 */
const express = require('express');

/**
 * @const
 */
const dotenv = require('dotenv');

/**
 * @const
 */
const path = require('path');

/**
 * @const
 */
const cookieParser = require('cookie-parser');

/**
 * @const
 */
const bodyParser = require('body-parser');

const port = process.env.PORT||8080;


const app = express();

const home = require('../routes/home.js');
const loginSignup = require('../routes/login_signup.js');



app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../templates/views'));

app.use('',home);
app.use('',loginSignup);

app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);
});