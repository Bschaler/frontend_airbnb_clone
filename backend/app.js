const express = require('express');
require('express-async-errors');                    
const morgan = require('morgan');                   
const cors = require('cors');                       
const csurf = require('csurf');                    
const helmet = require('helmet');                   
const cookieParser = require('cookie-parser');       
const { ValidationError } = require('sequelize');    
const path = require('path');                        

const { environment } = require('./config');         
const isProduction = environment === 'production';   

let routes;
try {
  routes = require('./routes');
  console.log('Routes successfully imported');
} catch (error) {
  console.error('Error importing routes:', error);
  routes = null;
}               

const app = express();                             

 
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
 
app.use(express.static(path.join(__dirname, 'public')));  

 
if (!isProduction) {
  app.use(cors({ origin: 'http://localhost:3000', credentials: true }));  
} else {
  app.use(cors({ 
    origin: 'https://frontend-airbnb-clone.onrender.com', 
    credentials: true 
  }));
}

app.options('*', cors());
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    time: new Date().toISOString(),
    env: process.env.NODE_ENV
  });
});
 

app.get('/', (req, res) => {
  res.json({
    message: 'AirBnB Clone API endpoints for testing',
    endpoints: {
      csrf: '/api/csrf/restore',
      spots: '/api/spots',
      users: '/api/users',
      sessions: '/api/session',
      bookings: '/api/bookings',
      reviews: '/api/reviews'
    }
  });
});

app.use(
  helmet.crossOriginResourcePolicy({
    policy: 'cross-origin'                           
  })
);

 /*
app.use(
  csurf({
    cookie: {
      secure: isProduction,
      sameSite: isProduction ? 'None' : 'Strict', 
      httpOnly: true
    }
  })
);
*/
app.get('/api/csrf/restore', (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken, {
    secure: isProduction,
    sameSite: isProduction ? 'None' : 'Lax', 
    path: '/'
  });
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});
 


if (routes) {
  console.log('Routes type:', typeof routes);
  console.log('Is routes function?', typeof routes === 'function');
  

  try {
    app.use(routes);
    console.log('Routes mounted successfully');
  } catch (error) {
    console.error('Error mounting routes:', error);
  }
 } else {
  console.log('Routes not available, using fallback routes');

app.get('/api', (req, res) => {
  res.json({ message: 'API is working' });
});

}

app.get('/direct-test', (req, res) => {
  res.json({ message: 'Direct test endpoint working' });
});

app.get('/api-test', (req, res) => {
  res.json({ message: 'API test endpoint working' });
});


// Serve frontend for non-API routes (SPA support)
// if (!isProduction) {
  // app.get('*', (req, res) => {
    // res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve index.html for all non-API routes
  // });
//}

app.use((_req, _res, next) => {                     
  const err = new Error('The requested resource couldn\'t be found.');
  err.title = 'Resource Not Found';
  err.errors = { message: 'The requested resource couldn\'t be found.' };
  err.status = 404;
  next(err);
});

 
app.use((err, _req, _res, next) => {                
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
});



 
app.use((err, _req, res, _next) => {                
  res.status(err.status || 500);
  const response = {
    message: err.title || err.message || "Server Error",
    errors: err.errors || {}
  };
   if (!isProduction) {
    console.error(err);
  }
  res.json(response);
});

module.exports = app;