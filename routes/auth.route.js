const Auth = require('../controllers/auth.controller')
const express = require('express');
const router = express.Router();

router.post('/login',Auth.login );
router.post('/register',Auth.register );
module.exports = router;