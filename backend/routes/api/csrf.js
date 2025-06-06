// routes/api/csrf.js
const express = require('express');
const router = express.Router();

router.get('/restore', (req, res) => {
  const csrfToken = req.csrfToken();
  res.cookie('XSRF-TOKEN', csrfToken);
  res.status(200).json({ 'XSRF-Token': csrfToken });
});

module.exports = router;
