/**
 * @const
 */
const express = require('express');

/**
 * @const
 */
const dotenv = require('dotenv').config();

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


/**
 * @const
 */
const db = require("../db/db-connection")


const port = process.env.PORT;

const home = require('../routes/home');
const index = require('../routes/index');
const loginSignup = require('../routes/login_signup');

const app = express();
app.use(express.static(path.join(__dirname,'/../public')));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'../templates/views'));
app.use(express.urlencoded({extended:false}))


// home.log
app.use("",home);
app.use("",index);
app.use('',loginSignup);

app.listen(port,()=>{
    console.log(`server is listening at http://localhost:${port}`);
});