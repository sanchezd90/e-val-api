const Subject = require('../models/subject')
const { validationResult } = require('express-validator');

const create = async (req,res) => {  
  const error = validationResult(req);
  if (!error.isEmpty()) {      
      return res.status(400).json({message: 'Missing data', error:error})
  }
  try{
    const {subject_id} = req.body;              
      let subject = await Subject.findOne({subject_id});        
      if (subject) {
          return res.status(400).json({message : 'This subject is already registered'})
      }
      subject = new Subject(req.body);
      const response = await subject.save()
      console.log(response);
      res.status(200).json(subject)
      
  }catch(err){
    console.log(err);
    res.status(500).json({err:err})  
  }    
} 

const getAll = async (req,res) => {
  try{
    const all = await Subject.find({deleted:"0"});
    res.status(200).json(all);
  }catch(error){
    res.status(500).json({'error':error});
  }
}

const getSingle = async (req,res) => {
  const subject_id = req.params.id;
  console.log(subject_id);
  try{
    const [subject] = await Subject.find({subject_id:subject_id});    
    if(subject.deleted==="0"){
      res.status(200).json(subject);
    }else{
      res.status(400).json({msg:'deleted'});
    }
  }catch(error){
    res.status(500).json({'error':error});
  }
}

const update = async (req,res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
      return res.status(400).json({errores: error.array()})
  }
  try{    
    const {subject_id} = req.body;        
    const subject = req.body;    
    console.log(subject);      
    const response = await Subject.updateOne({subject_id:subject_id},subject);    
    res.status(200).json(response)
      
  }catch(error){
    console.log(error);
    res.status(500).send("update error")  
  }    
} 

const del = async (req,res) => {
  const subject_id = req.params.id;
  try{                        
    const subject = await Subject.updateOne({subject_id:subject_id},{deleted:"1"});    
    res.status(200).json(subject)
      
  }catch(error){
    console.log(error);
    res.status(500).send("delete error")  
  }    
} 

module.exports = {create,getAll,getSingle,update,del}