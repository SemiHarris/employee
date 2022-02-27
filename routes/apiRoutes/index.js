const express = require('express');
const router = express.Router();

router.use(require('./employee'));
router.use(require('./role'));

module.exports = router;