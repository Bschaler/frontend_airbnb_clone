// backend/config/index.js

module.exports = {
    environment: process.env.NODE_ENV || 'development',  
    port: process.env.PORT || 1000,                      
    dbFile: process.env.DB_FILE || './db/development.db',                 
    jwtConfig: {
      secret: process.env.JWT_SECRET,                    
      expiresIn: process.env.JWT_EXPIRES_IN           
    }
  };
  