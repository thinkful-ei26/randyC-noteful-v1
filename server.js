'use strict';

console.log('Hello Noteful!');

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

// Load array of notes
const data = require('./db/notes');

const app = express();

// ADD STATIC SERVER HERE

app.listen(8080, function(){

  console.info('Server listening on ${this.address().port}');

}).on('error',err => {

  console.error(err);

});

//End points
app.get('/api/notes',(req,res) => {

  res.json(data);

});


app.get('/api/notes/:id',(req,res) => {

  console.log(typeof req.params.id);

  const noteById = data.find(note => note.id === parseInt(req.params.id));

  console.log(noteById);

  
  res.json(noteById);

});


 

