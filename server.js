'use strict';

console.log('Hello Noteful!');

//Simple in-memory database
const data = require('./db/notes');

const simDB = require('./db/simDB');

const notes = simDB.initialize(data);


const { PORT } = require('./config');

const accessLogging = require('./middleware/logger');


 
// INSERT EXPRESS APP CODE HERE...
const express = require('express');

// Load array of notes




const app = express();

app.use(express.static('public'));

// ADD STATIC SERVER HERE

app.use(accessLogging);


//End points

//Get all notes and Search titles using a search term...
app.get('/api/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array

  });
});


app.get('/api/notes/:id',(req,res) => {
 
  //gets a note by params id (converted to a number)
  const noteById = data.find(note => note.id === parseInt(req.params.id));
 
  res.json(noteById);

});

 


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
 


 

