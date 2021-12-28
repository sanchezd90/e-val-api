const express = require('express');
const router = express.Router();
const users = require('../controllers/users')
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/create',    
    [        
        check('email','Provide a valid email address').isEmail(),
        check('pass','Your password must contain at least 6 characters').isLength({min:6}) 
    ],
    users.createUser
)
router.post('/signin',
    [        
        check('email','Provide a valid email address').isEmail(),
        check('pass','Your password must contain at least 6 characters').isLength({min:6}) 

    ],
    users.authUser
)

router.post('/verify/:uid',    
    users.verifyEmail
)

module.exports = router;

