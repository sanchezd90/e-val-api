const mongoose = require('mongoose');

const normSchema = mongoose.Schema({
    norm_id: {
        type: String,
        require: true,
        unique:true,
    },
    author: {
        type: String,            
    },
    type: {
        type: String,            
    },
    sex: {
        type: [String],            
    },
    nse: {
        type: [[Number]],            
    },
    age: {
        type: [[Number]],            
    },    
    norms: {
        type: Object,            
    },    
    description: {
        type: String,            
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

module.exports = mongoose.model('norm', normSchema);