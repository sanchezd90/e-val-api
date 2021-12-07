const express = require('express');
const router = express.Router();
const assessments = require('../controllers/assessments')
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/create',
    auth,
    [
        check('subject_id','Subject ID is required').not().isEmpty(),                      
    ],
    assessments.create
)
router.get('/get/all',
    assessments.getAll
);
router.get('/get/single/:id',
    assessments.getSingle
);
router.post('/update',
    auth,
    [
        check('subject_id','Subject ID is required').not().isEmpty(),                            
    ],
    assessments.update
);
router.post('/delete/:id',
    auth,
    assessments.del
);

module.exports = router;

