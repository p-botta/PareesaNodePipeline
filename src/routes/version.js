const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ version: process.env.APP_VERSION || 'dev' });
});

module.exports = router;
