const mongoose = require('mongoose');

const subjectSchema = mongoose.Schema({
    first_name:{
        type: String,
        require: true,
        trim: true
    },
    last_name:{
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true,        
    },
    subject_id:{
        type: String,
        require: true,
        trim: true,
        unique:true,
    },
    ts_create:{
        type: Date,
        default: Date.now()
    },
    birth_date:{
        type: String,
        require: true,
    },
    sex:{
        type: String,
        require: true,
    },
    handedness:{
        type: String,
        require: true,
    },
    deleted:{
        type: String,
        default: '0'
    },

});

module.exports = mongoose.model('subject', subjectSchema);