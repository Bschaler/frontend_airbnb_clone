// backend/utils/auth.js
const jwt = require('jsonwebtoken');              // For creating and verifying JWTs
const { jwtConfig } = require('../config');       // Import JWT configuration
const { User } = require('../db/models');         // Import User model

const { secret, expiresIn } = jwtConfig;          // Extract JWT settings

const setTokenCookie = (res, user) => {
  const safeUser = {                              // Create a safe user object without sensitive data
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,                   // Include firstName in token
    lastName: user.lastName                      // Include lastName in token
  };
  
  const token = jwt.sign(
    { data: safeUser },                           // Payload to encode in the JWT
    secret,                                       // Secret key for signing
    { expiresIn: parseInt(expiresIn) }            // Token expiration (604,800 seconds = 1 week)
  );

  const isProduction = process.env.NODE_ENV === "production";


  res.cookie('token', token, {
    maxAge: expiresIn * 1000,                     
    httpOnly: true,                               
    secure: isProduction,                         
    sameSite: isProduction && "Lax"               
  });

  return token;
};

const restoreUser = (req, res, next) => {

  const { token } = req.cookies;
  req.user = null;                                

  return jwt.verify(token, secret, null, async (err, jwtPayload) => {
    if (err) {
      return next();                             
    }

    try {
      const { id } = jwtPayload.data;            
      req.user = await User.findByPk(id, {       
        attributes: {
          include: ['email', 'createdAt', 'updatedAt']  
        }
      });
    } catch (e) {
      res.clearCookie('token');                 
      return next();
    }

    if (!req.user) res.clearCookie('token');     

    return next();
  });
};


const requireAuth = function (req, _res, next) {
  if (req.user) return next();                  

  const err = new Error('Authentication required'); 
  err.title = 'Authentication required';
  err.errors = { message: 'Authentication required' };
  err.status = 401;                              
  return next(err);                               
}

module.exports = { setTokenCookie, restoreUser, requireAuth };