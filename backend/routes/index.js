const express = require('express');
const router = express.Router();
const apiRouter = require('./api');


router.use('/api', apiRouter);

//debugger
router.get('/debug-path', (req, res) => {
  const path = require('path');
  const fs = require('fs');
  const frontendDistPath = path.join(__dirname, '..', '..', 'frontend', 'dist');
  const indexPath = path.join(frontendDistPath, 'index.html');
  
  res.json({
    NODE_ENV: process.env.NODE_ENV,
    __dirname: __dirname,
    frontendDistPath: frontendDistPath,
    indexPath: indexPath,
    indexExists: fs.existsSync(indexPath),
    distContents: fs.existsSync(frontendDistPath) ? fs.readdirSync(frontendDistPath) : 'dist folder not found'
  });
});

router.get('/debug-error', (req, res) => {
  try {
    res.json({
      NODE_ENV: process.env.NODE_ENV,
      csrfTokenAvailable: typeof req.csrfToken === 'function',
      production: process.env.NODE_ENV === 'production'
    });
  } catch (error) {
    res.json({
      error: error.message,
      stack: error.stack
    });
  }
});





if (process.env.NODE_ENV === 'production') {
  const path = require('path');

 const frontendDistPath = path.join(__dirname, '..', '..', 'frontend', 'dist');


   router.get('/', (req, res) => {
   // res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });

  router.use(express.static(frontendDistPath));

    router.get(/^(?!\/?api).*/, (req, res) => {
    //res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(path.join(frontendDistPath, 'index.html'));
  });
}


    //router.get('/api', (req, res) => {
  //res.json({ message: 'API is working' });
//});
if (process.env.NODE_ENV !== 'production') {
router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});
}

module.exports = router;