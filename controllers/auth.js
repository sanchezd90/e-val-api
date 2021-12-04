const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.authUser = async (req, res, next) => {
    const err = validationResult(req);
    if(!err.isEmpty){
        return res.status(400).json({error: err.array()})
    }

    const {email,pass} = req.body;

    try{
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg: 'User is not registered'});
        }
        const passMatch = await bcryptjs.compare(pass,user.pass);

        if(!passMatch){
            return res.status(400).json({msg: 'Invalid password'});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn:3600
        },(error,token) => {
            if(error) throw error;
            res.json({ token })
        })

    }catch(err){
        console.log(err);
    }

}