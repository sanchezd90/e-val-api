const express = require('express');
const router = express.Router();
const subjects = require('../controllers/subjects')
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/create',
    auth,
    [
        check('first_name','First name is required').not().isEmpty(),        
        check('last_name','Last name is required').not().isEmpty(),        
        check('email','Email is required').not().isEmpty(),        
        check('suject_id','ID is required').not().isEmpty(),        
        check('birth_date','Birth date is required').not().isEmpty(),        
        check('sex','Sex is required').not().isEmpty(),        
        check('handedness','Handedness is required').not().isEmpty(),        
    ],
    subjects.create
)
router.get('/all',
    subjects.getAll
);
router.get('/single/:id',
    subjects.getSingle
);
router.post('/update',
    auth,
    [
        check('test_id','Identifier is required').not().isEmpty(),        
        check('full_name','Full name is required').not().isEmpty(),        
        check('versions','Provide at least one version of the test').not().isEmpty(),        
    ],
    subjects.update
);
router.post('/delete/:id',
    auth,
    subjects.del
);

module.exports = router;

