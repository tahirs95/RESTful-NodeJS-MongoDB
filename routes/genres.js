const express = require('express');
const router = express.Router();
const { Genre, validate} = require('../models/genres')

router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

router.post('/', async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({
    name: req.body.name
  });
  try{
    let result = await genre.save();
    console.log(result);
    res.send(result);
  }
  catch(ex){
    console.log(ex.message);
    res.send(ex.message);
  }
  
});

router.put('/:id', async(req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id, 
    {
        name:req.body.name,
    },
    { new:true }
  );
  console.log(genre);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);

});

router.delete('/:id', async(req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  console.log(genre);
  res.send(genre);
});

router.get('/:id', async(req, res) => {
  const genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  res.send(genre);
});

module.exports = router;