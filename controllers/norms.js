const Norm = require('../models/norm')
const { validationResult } = require('express-validator');

const create = async (req,res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
      return res.status(400).json({errores: error.array()})
  }
  try{
    const {norm_id} = req.body;              
      let norm = await Norm.findOne({norm_id});        
      if (norm) {
          return res.status(400).json({message : 'This norm is already registered'})
      }
      norm = new Norm(req.body);
      await norm.save()
      res.status(200).json(norm)
      
  }catch(error){
    console.log(error);
    res.status(400).send("Norm register error")  
  }    
} 

const getAll = async (req,res) => {
  try{
    const all = await Norm.find({deleted:"0"});
    res.status(200).json(all);
  }catch(error){
    res.status(500).json({'error':error});
  }
}

const getSingle = async (req,res) => {
  const norm_id = req.params.id;
  try{
    const [norm] = await Norm.find({norm_id:norm_id, deleted:"0"});
    if(norm.deleted==="0"){
      res.status(200).json(norm);
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
    const {norm_id} = req.body;        
    const norm = req.body;
    delete norm["_id"];       
    const response = await Norm.replaceOne({norm_id:norm_id['$oid']},norm);    
    res.status(200).json(response)
      
  }catch(error){
    console.log(error);
    res.status(500).send("update error")  
  }    
} 

const del = async (req,res) => {
  const norm_id = req.params.id;
  try{                        
    const norm = await Norm.updateOne({norm_id:norm_id},{deleted:"1"});    
    res.status(200).json(norm)
      
  }catch(error){
    console.log(error);
    res.status(500).send("delete error")  
  }    
} 

module.exports = {create,getAll,getSingle,update,del}