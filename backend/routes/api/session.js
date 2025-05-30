// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');           
const bcrypt = require('bcryptjs');            
const { check } = require('express-validator');                   
const { handleValidationErrors } = require('../../utils/validation');  
const { setTokenCookie, restoreUser } = require('../../utils/auth');  
const { User } = require('../../db/models');   
const router = express.Router();


const validateLogin = [                                           
  check('credential')                                             
    .exists({ checkFalsy: true })                                
    .notEmpty()                                                 
    .withMessage('Please provide a valid email or username.'),  
  check('password')                                              
    .exists({ checkFalsy: true })
    .notEmpty()                                   
    .withMessage('Please provide a password.'),               
  handleValidationErrors                                       
];

router.post(
  '/', 
   (req, res, next) => {
    console.log('Raw request body:', req.body);
    console.log('Request headers:', req.headers);
    next();
  },
  validateLogin,
  async (req, res, next) => {   
  const { credential, password } = req.body;   


  const user = await User.unscoped().findOne({  
    where: {
      [Op.or]: {                              
        username: credential,
        email: credential
      }
    }
  });

 
  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    return res.status(401).json({
      message: "Invalid credentials"
    });
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,                 
    lastName: user.lastName                   
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser
  });
}
);

router.delete('/', (req, res) => {           
  res.clearCookie('token');                    
  return res.json({ message: 'success' });     
});


router.get('/', (req, res) => {
    const { user } = req;
    if (user) {
      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,              
        lastName: user.lastName                 
      };
      return res.json({
        user: safeUser
      });
    } else return res.json({ user: null });
  }
);

module.exports = router;