const express = require('express');
const router = express.Router();
const tests = require('../controllers/tests')
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/create',
    auth,
    [
        check('test_id','Identifier is required').not().isEmpty(),        
        check('full_name','Full name is required').not().isEmpty(),                
    ],
    tests.create
)
router.get('/all',        
    tests.getAll
);
router.get('/single/:id',
    tests.getSingle
);
router.post('/update',
    auth,
    [
        check('test_id','Identifier is required').not().isEmpty(),        
        check('full_name','Full name is required').not().isEmpty(),                
    ],
    tests.update
);
router.post('/delete/:id',
    auth,
    tests.del
);

module.exports = router;

