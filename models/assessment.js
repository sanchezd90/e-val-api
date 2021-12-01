const mongoose = require('mongoose');

const administered_test = mongoose.Schema({
    test_name: {
        type: String,
        require: true,        
    },
    version: {
        type: String,
        require: true,        
    },
    norm_source: {
        type: String,
        require: true,        
    },
    mean: {
        type: Number,        
    },
    standard_deviation: {
        type: Number,        
    },
    cutoff: {
        type: Number,        
    },
    tasks: {
        type: Map,
        of: newSchema ({
            answers: [String],
            comments: String,
            score: Number,            
        })        
    },
})

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
        type: [administered_test],                
    },    
    ts_create:{
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('assessment', assessmentSchema);