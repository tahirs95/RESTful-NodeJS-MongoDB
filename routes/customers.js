const express = require('express');
const router = express.Router();
const { Customer, validate} = require('../models/customer')

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  try{
    let result = await customer.save();
    console.log(result);
    res.send(result);
  }
  catch(ex){
    console.log(ex.message);
    res.send(ex.message);
  }
});

module.exports = router;