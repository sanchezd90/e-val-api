const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('username','Username is required').not().isEmpty(),
        check('email','Provide a valid email address').isEmail(),
        check('pass','Your password must contain at least 6 characters').isLength({min:6}) 

    ],
    users.createUser
)

module.exports = router;

