const express = require('express');

const router = new express.Router();

router.get('/main', (req, res) => {
  res.status(200).json({
    message: "Welcome to Bookworms.",
    // user values passed through from auth middleware
    user: req.user
  });
});

module.exports = router;
