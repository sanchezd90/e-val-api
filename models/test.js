const mongoose = require('mongoose');

const Section = mongoose.Schema({
    instructions:{
        type: String,
    }    
})

const Task = mongoose.Schema({
    title: String,
    domain: String,
    general_instructions: String,
    sections : [Section],
})

const Subscale = mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique:true,
    },
    tasks:{
        type: [String],
        require: true,        
    },
})

const Version = mongoose.Schema({
    name:{
        type: String,
        require: true,
        unique:true,
    },
    full_name:{
        type: String,
        require: true,        
    },
    language:{
        type: String,
        require: true,
    },
    norms:{
        type: [String],
        require: true,
    },
    subscales:{
        type: [Subscale],        
    },
    taskData:{
        type: Map,
        of: Task, 
    }
})

const testSchema = mongoose.Schema({
    test_id: {
        type: String,
        require: true,
        unique:true,
    },
    full_name: {
        type: String,
        require: true,
    },
    versions: {
        type: [Version],        
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

module.exports = mongoose.model('test', testSchema);