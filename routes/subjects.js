const express = require('express');
const router = express.Router();
const subjects = require('../controllers/subjects')
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/create',    
    [
        check('first_name','First name is required').not().isEmpty(),        
        check('last_name','Last name is required').not().isEmpty(),        
        check('email','Email is required').not().isEmpty(),        
        check('subject_id','ID is required').not().isEmpty(),        
        check('birth_date','Birth date is required').not().isEmpty(),        
        check('sex','Sex is required').not().isEmpty(),        
        check('handedness','Handedness is required').not().isEmpty(),        
    ],
    subjects.create
)
router.get('/get/all',
    subjects.getAll
);
router.get('/get/single/:id',
    subjects.getSingle
);
router.post('/update',    
    [       
        check('subject_id','ID is required').not().isEmpty(),             
    ],
    subjects.update
);
router.post('/delete/:id',    
    subjects.del
);

module.exports = router;

