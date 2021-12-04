const express = require('express');
const router = express.Router();
const norms = require('../controllers/norms')
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/create',
    auth,
    [
        check('norm_id','Identifier is required').not().isEmpty(),                
    ],
    norms.create
)
router.get('/all',
    norms.getAll
);
router.get('/single/:id',
    norms.getSingle
);
router.post('/update',
    auth,
    [
        check('norm_id','Identifier is required').not().isEmpty(),                
    ],
    norms.update
);
router.post('/delete/:id',
    auth,
    norms.del
);

module.exports = router;

