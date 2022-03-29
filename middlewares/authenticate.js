const jwt = require("jsonwebtoken")
const Register = require("../models/user_schema")
const SECRET_KEY = process.env.SECRET_KEY;


const auth = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(token)
        {
            const userVerify = jwt.verify(token,SECRET_KEY)
            const user = await Register.findOne({_id:userVerify._id})
            
            req.token = token;
            req.user = user;
            
            console.log(`token verified `);
            next();
        }
        else if(req.url !== '/'){
            // const page = req.url;
            res.redirect("/login")
        } else{
            res.render("home")
        }
    } catch (error) {
        res.status(401).send(error)
    }
}


module.exports = auth;