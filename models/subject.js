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
    id:{
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
        type: Date,
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

});

module.exports = mongoose.model('subject', subjectSchema);