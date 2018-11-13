'use strict';

console.log('Hello Noteful!');

const { PORT } = require('./config');

const accessLogging = require('./middleware/logger');


 
// INSERT EXPRESS APP CODE HERE...
const express = require('express');

// Load array of notes

//Simple in-memory database
const data = require('./db/notes');

const simDB = require('./db/simDB');

const notes = simDB.initialize(data);



const app = express();

// ADD STATIC SERVER HERE

app.use(accessLogging);

app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(404).json({ message: 'Not Found' });
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

 

app.listen(PORT, function(){
   
  console.info('Server listening on ${this.address().port}');

}).on('error',err => {

  console.error(err);

});

//End points

//ERROR END POINT
app.get('/boom', (req, res, next) => {
  throw new Error('Boom!!');
});

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

 

  
 


 

