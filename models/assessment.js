const mongoose = require('mongoose');

const Task = mongoose.Schema({
    answers: [String],
    comments: String,
    score: Number,
})

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
        of: Task,        
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
    deleted:{
        type: String,
        default: '0'
    },
});

module.exports = mongoose.model('assessment', assessmentSchema);