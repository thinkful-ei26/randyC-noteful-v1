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

//Get all notes and Search is a search term...
app.get('/api/notes',(req,res) => {

  const currentSearchTerm = req.query.searchTerm;

  if(currentSearchTerm !== undefined){

    //filter for title
    const noteBySearchTerm = data.filter(note => note.title.includes(req.query.searchTerm));

    res.json(noteBySearchTerm);

  }else{

    res.json(data);
 
  }
 
});


app.get('/api/notes/:id',(req,res) => {
 
  //gets a note by params id (converted to a number)
  const noteById = data.find(note => note.id === parseInt(req.params.id));
 
  res.json(noteById);

});

 

  
 


 

