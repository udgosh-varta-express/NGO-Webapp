const User = require('../models/user.model');
const { validationResult } = require('express-validator');
const passport = require('passport');
const session = require('express-session')

// Rendering Login page 
exports.getLogin = (req,res,next)=>{
    res.render('login',{title:'Login',csrfToken: req.csrfToken()});
}

// Checking Login credentails/Authenticating with Passport Js and Regenerating Session 
exports.postLogin = (req,res,next)=>{
  
    try {
      //Performing Validation and Sanitizing User Input. For more info look At: utils/validator.js 
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        errors.array().forEach((error) => {
          req.flash('error', error.msg);
        });
        res.render('login', {
          email: req.body.email,
          csrfToken: req.csrfToken(),
          messages: req.flash(),title:'Login'
        });
        return;
      }else {

        //Authenticating with Passport Js
        passport.authenticate('local', {
          successReturnToOrRedirect: '/',
          failureRedirect: '/auth/login',
          failureFlash: true,
        })(req,res);

        //Now Regenerating Session because of Session Hijacking
        req.session.login(req.user,(err)=>{
          if (err) {
            res.status(err.status).render('login', {
              email: req.body.email,
              messages: "There was an error logging in. Please try again later.",title:'Login'
            });
            return;
          }
        });
      }

    } catch (error) {
      next(error)
    }
}

//Rendering Register page
exports.getRegister = (req,res,next)=>{
    res.render('register',{title:'Register',csrfToken:req.csrfToken()});
}

//// Checking Login credentails and Saving Data 
exports.postRegister = async(req,res,next)=>{
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          errors.array().forEach((error) => {
            req.flash('error', error.msg);
          });
          res.render('register', {
            email: req.body.email,
            csrfToken: req.csrfToken(),
            messages: req.flash(),
            title:'Register'
          });
          return;
        }
  
        const { email } = req.body;
        const doesExist = await User.findOne({ email });
        if (doesExist) {
          req.flash('warning', 'Username/email already exists');
          res.redirect('/auth/register');
          return;
        }
        const user = new User(req.body);
        await user.save();
        req.flash(
          'success',
          `${user.email} registered succesfully, you can now login`
        );
        res.redirect('/auth/login');
      } catch (error) {
        next(error);
      }
}

//Logging out user and Destroying Session
exports.getLogout = (req,res,next)=>{
    req.logout();
    req.session.destroy((err)=>{
     res.clearCookie('cookie')
     res.redirect('/');
    })
}

// //Get forget password 
// exports.getForgetPassword = (req,res,next)=>{
//     res.render('forget-password')
// }


// exports.forgetPassword = (req,res,next)=>{
//     const {password} = req.body;
//   try {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       errors.array().forEach((error) => {
//         req.flash('error', error.msg);
//       });
//       res.render('register', {
//         email: req.body.email,
//         csrfToken: req.csrfToken(),
//         messages: req.flash(),
//         title:'Register'
//       });
//       return;
//     }
//   } catch (error) {
    
//   }

// }


//Adding Session_Regenerate Function to session 
session.Session.prototype.login = function (userInfo,cb) {
  const req = this.req;
  req.session.regenerate(function(err){
     if (err){
        cb(err);
     }
  });

  req.session.user = userInfo;
  cb();
};

