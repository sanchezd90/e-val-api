const mongoose = require('mongoose');

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

module.exports = mongoose.model('test', testSchema);