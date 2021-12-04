const Assessment = require('../models/assessment')
const { validationResult } = require('express-validator');

const create = async (req,res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
      return res.status(400).json({errores: error.array()})
  }
  try{
    const {assessment_id} = req.body;              
      let assessment = await Assessment.findOne({assessment_id});        
      if (assessment) {
          return res.status(400).json({message : 'This assessment is already registered'})
      }
      assessment = new Assessment(req.body);
      await assessment.save()
      res.status(200).json(assessment)
      
  }catch(error){
    console.log(error);
    res.status(400).send("Assessment register error")  
  }    
} 

const getAll = async (req,res) => {
  try{
    const all = await Assessment.find({deleted:"0"});
    res.status(200).json(all);
  }catch(error){
    res.status(500).json({'error':error});
  }
}

const getSingle = async (req,res) => {
  const assessment_id = req.params.id;
  try{
    const assessment = await Assessment.findById(assessment_id);
    if(assessment.deleted==="0"){
      res.status(200).json(assessment);
    }else{
      res.status(200).json({msg:'deleted'});
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
    const {assessment_id} = req.body;        
    const assessment = req.body;
    delete assessment["_id"];       
    const response = await Assessment.replaceOne({assessment_id:assessment_id['$oid']},assessment);    
    res.status(200).json(response)
      
  }catch(error){
    console.log(error);
    res.status(500).send("update error")  
  }    
} 

const del = async (req,res) => {
  const assessment_id = req.params.id;
  try{                        
    const assessment = await Assessment.updateOne({assessment_id:assessment_id},{deleted:"1"});    
    res.status(200).json(assessment)
      
  }catch(error){
    console.log(error);
    res.status(500).send("delete error")  
  }    
} 

module.exports = {create,getAll,getSingle,update,del}