const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.createUser = async (req,res) => {    
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({errores: error.array()})
    }

    try{
        const {email, pass} = req.body;                 
        let user = await User.findOne({email});        
        if (user) {
            return res.status(400).json({message : 'User is already registered'})
        }        
        user = new User(req.body);        
        const salt = await bcryptjs.genSalt(10);
        user.pass = await bcryptjs.hash(pass,salt);        
        await user.save()        
        const payload = {
            user:{
                id: user.id,
            }
        }
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600
        }, (error,token) => {
            if (error) throw error;
            res.json({token:token});            
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).send("register error")        
        }
} 