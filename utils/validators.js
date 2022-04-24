const { body } = require('express-validator');
module.exports = {
  //This is Register page Validation
  registerValidator: [
    body('firstname','Firstname cannot be empty').trim().notEmpty().bail().isLength(3).withMessage('First Name length short, min 3 char required').bail().isAlpha().withMessage('First Name must be alphabetic')
    ,body('lastname','Lastname cannot be empty').trim().notEmpty().bail().isLength(3).withMessage('Last Name length short, min 3 char required').bail().isAlpha().withMessage('Last Name must be alphabetic')
    ,body('email').trim().escape().isEmail().withMessage('Email must be a valid email').normalizeEmail().toLowerCase()
    // ,body('password').trim().isLength(2).withMessage('Password length short, min 2 char required')
    ,body('password').isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
      returnScore: false,
      pointsPerUnique: 1,
      pointsPerRepeat: 0.5,
      pointsForContainingLower: 10,
      pointsForContainingUpper: 10,
      pointsForContainingNumber: 10,
      pointsForContainingSymbol: 10,
    }).withMessage("Password should contains uppercase lowecase letters, numbers, and special characters")
    ,body('password2').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password do not match');
      }
      return true;
    }),
  ],
  //This is Login page Validation
  loginValidator:[
    body('email').trim().escape().isEmail().withMessage('Email must be a valid email').normalizeEmail().toLowerCase()
    ,body('password').trim().isLength(2).withMessage('Password length short, min 2 char required')
  ],
};
