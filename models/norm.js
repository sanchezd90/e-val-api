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
    age: {
        type: Map,
        of:[[[[Number]]]]
    },
    description: {
        type: String,            
    },
    ts_create:{
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('norm', normSchema);