const bcryptjs = require("bcryptjs");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {v4: uuid} = require('uuid');
const { send } = require('../services/mail')

const createUser = async (req,res) => {    
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
        const uid = uuid();
        user.uid= uid;        
        await user.save()        
        const payload = {
            user:{
                id: user.id,
            }
        }
        send({
            mail : email, 
            body:
            `<h1> Welcome to E-val!</h1>
            Click <a href="http://${process.env.SERVER_URL}:${process.env.SERVER_PORT}/users/verify/${uid}">here</a> to validate your email account`,
            });        
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn: 3600
        }, (error,token) => {
            if (error) throw error;
            res.json({token:token});            
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send("register error")        
        }
} 

const verifyEmail = async(req, res) => {
    const {uid} = req.params;
    console.log(uid);
    try{
        const match = await User.find({uid:uid},{_id:1});
        if (match) {
            try{
                const response = await User.replaceOne({_id:response._id['$oid']},{valid_email:true});
                if (response) {
                    return res.status(400).json({message : 'User verified'})
                }
            } catch (error) {
                console.log(error);
                res.status(500).send("email verification error")  
            }                                   
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send("register error")    
    }    
    
}

const authUser = async (req,res) => {    
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({errores: error.array()})
    }

    try{
        let {email, pass} = req.body;                                 
        let user = await User.findOne({email:email});                               
        if (bcryptjs.compareSync(pass,user.pass)) {            
            const payload = {
                user:{
                    id: user.id,
                    role: user.role
                }
            }                                        
            jwt.sign(payload,process.env.SECRETA,{
                expiresIn: 3600
            }, (error,token) => {
                if (error) throw error;
                res.json({token:token});            
            })            
        }else{
            res.json({message:'Invalid user'});            
        }          
    } catch (error) {
        console.log(error);
        res.status(500).send("register error")        
        }
} 

module.exports = {createUser,verifyEmail, authUser}