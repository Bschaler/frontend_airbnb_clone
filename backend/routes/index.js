const express = require('express');
const router = express.Router();
const apiRouter = require('./api');


router.use('/api', apiRouter);

router.get("/api/csrf/restore", (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});


if (process.env.NODE_ENV === 'production') {
  const path = require('path');

  const frontendBuildPath = path.resolve(__dirname, '../../frontend/dist');
  
  router.use(express.static(frontendBuildPath));

  router.get('/', (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
  
 
  router.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
}

module.exports = router;      