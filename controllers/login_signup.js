const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Register = require("../models/user_schema")



exports.get_login = (req, res) => {
    res.render('login');
}

exports.get_register = (req, res) => {
    res.render('register');
}

exports.save_register = async (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email
    const password = req.body.psw
    const rpassword = req.body.pswrepeat
    console.log(`FirstName:${firstName} LastName:${lastName} email:${email} password:${password} `);
    if(firstName && lastName && email && password && rpassword)
    {

        try {
            if (password == rpassword) {
                const registerUser = new Register({
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    password: password,
                    
                })
                console.log(registerUser);
    
                const token = await registerUser.generateAuthToken();
                console.log(`token gen in register method ${token}`);
                res.cookie('jwt',token,{
                    expires:new Date(Date.now() + 30000),
                    httpOnly:true
                })
                // console.log();
                const registered = await registerUser.save();
                res.status(201).redirect('/index')
            }
            else {
                res.send("password are not matching")
            }
        } catch (error) {
            res.status(400).send(error);
        }

    } else{
        res.status(403).send("please fill all fields")
    }


  
}


exports.checkLoginData = async (req, res) => {
    const email = req.body.uname;
    const password = req.body.psw;
    let passwordHashStatus;
    try {
        if (email && password) {
            const loginData = await Register.findOne({ email })
            
            if (loginData != null) {
                // console.log(`token is ${loginData.tokens[0].token}`);
                passwordHashStatus = await bcrypt.compare(password, loginData.password)
               const token = await loginData.generateAuthToken();
               // console.log(passwordHashStatus);
               // console.log(`this is token ${token}`);
               if (passwordHashStatus) {
                    res.cookie('jwt',token,{
                        expires:new Date(Date.now() + 300000),
                        httpOnly:true
                    })
                    res.status(201).redirect('/index')
                } else {
                    res.status(403).send("not matching")
                }
            } else {
                res.status(403).send("email and password not mathcning")
            }
            // console.log(loginData.tokens);   
        } else {
            res.status(403).send("fill fields")
        }




    } catch (error) {
        res.status(403).send(error)
    }
}

exports.logout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        req.user.tokens = req.user.tokens.filter((currentElement)=>{
            return currentElement.token !== req.token
        })
        await req.user.save();

        console.log("logout succesfully");
        res.status(201).redirect('/');

    } catch (error) {
        res.status(500).send(error)
    }
    
    
}
