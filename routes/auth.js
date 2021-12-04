const express = require ('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/auth')

router.post('/',
    [        
        check('email','Provide a valid email address').isEmail(),
        check('pass','Your password must contain at least 6 characters').isLength({min:6}) 
    ],
    authController.authUser
)

module.exports = router;