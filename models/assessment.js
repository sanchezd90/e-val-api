const mongoose = require('mongoose');

const assessmentSchema = mongoose.Schema({
    subject_id: {
        type: String,
        require: true,        
    },
    appointment_dates: {
        type: [Date],                
    },
    assessed_by: {
        type: [String],                
    },
    report: {
        type: String,                
    },
    comments: {
        type: String,                
    },
    education: {
        type: Number,                
    },
    admited_by: {
        type: [String],                
    },
    tags: {
        type: [String],                
    },    
    administered_tests: {
        type: Array,                
    },    
    ts_create:{
        type: Date,
        default: Date.now()
    },
    deleted:{
        type: String,
        default: '0'
    },
});

module.exports = mongoose.model('assessment', assessmentSchema);