const jwt = require("jsonwebtoken")
const Register = require("../models/user_schema")
const SECRET_KEY = process.env.SECRET_KEY;


const auth = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        // console.log(token);
        if(token)
        {
            const userVerify = jwt.verify(token,SECRET_KEY)
            const user = await Register.findOne({_id:userVerify._id})
            
            req.token = token;
            req.user = user;
            
            console.log(`token verified `);
            next();
        }
        else{
            res.render("home")
            console.log(`token not found`);
        }
    } catch (error) {
        res.status(401).send(error)
    }
}

// const loginAuth = async (req,res,next)=>
// {
//     try {
//       const token = req.cookies.jwt

//       if(token)
//       {
//           const userVerify = jwt.verify(token,SECRET_KEY)
//           const user
//       }
//     } catch (error) {
//         res.send("the error part"+error)
//         console.log(error);
//     }
// }
module.exports = auth;