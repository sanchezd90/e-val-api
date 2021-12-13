const Test = require('../models/test')
const { validationResult } = require('express-validator');

const create = async (req,res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
      return res.status(400).json({errores: error.array()})
  }
  try{
    const {test_id} = req.body;              
      let test = await Test.findOne({test_id});        
      if (test) {
          return res.status(400).json({message : 'This test is already registered'})
      }
      test = new Test(req.body);
      await test.save()
      res.status(200).json(test)
      
  }catch(error){
    console.log(error);
    res.status(400).send("Test register error")  
  }    
} 

const getAll = async (req,res) => {
  try{
    const all = await Test.find({deleted:"0"});
    res.status(200).json(all);
  }catch(error){
    res.status(500).json({'error':error});
  }
}

const getSingle = async (req,res) => {
  const test_id = req.params.id;
  try{
    const [test] = await Test.find({test_id:test_id, deleted:"0"});
    console.log(test)
    if(test.deleted==="0"){
      res.status(200).json(test);
    }else{
      res.status(200).json({msg:'deleted'});
    }
  }catch(error){
    res.status(500).json({'error':error});
  }
}

const getNames = async (req,res) => {  
  try{
    const all = await Test.find({deleted:"0"},{test_id:1,fullName:1});
    res.status(200).json(all);
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
    const {test_id} = req.body;        
    const test = req.body;
    delete test["_id"];       
    const response = await Test.replaceOne({test_id:test_id['$oid']},test);    
    res.status(200).json(response)
      
  }catch(error){
    console.log(error);
    res.status(500).send("update error")  
  }    
} 

const del = async (req,res) => {
  const test_id = req.params.id;
  try{                        
    const test = await Test.updateOne({test_id:test_id},{deleted:"1"});    
    res.status(200).json(test)
      
  }catch(error){
    console.log(error);
    res.status(500).send("delete error")  
  }    
} 

module.exports = {create,getAll,getSingle,getNames,update,del}