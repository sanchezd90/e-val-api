const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username:{
        type: String,        
        trim: true
    },
    email:{
        type: String,
        require: true,
        trim: true,
        unique:true,
    },
    country:{
        type: String,                        
    },
    uid:{
        type: String,        
    },
    role:{
        type: String,
        enum : ['user','admin'],
        default: 'user'       
    },
    valid_email:{
        type: Boolean,                
        default: false,
    },
    pass:{
        type: String,
        require: true,
        trim: true
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

module.exports = mongoose.model('user', userSchema);