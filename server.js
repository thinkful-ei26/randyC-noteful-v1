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



// Create an express application
const app = express();

// Log all requests
app.use(accessLogging);

// Create a static webserver
app.use(express.static('public'));//very important

// Parse request body
app.use(express.json());





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



//Get note by id#
app.get('/api/notes/:id',(req,res, next) => {
 
  const noteById = req.params.id;

  notes.find(noteById, (err,list) => {

    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array

  });
 
});





//PUT updates a note
app.put('/api/notes/:id', (req, res, next) => {
  const id = req.params.id;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  notes.update(id, updateObj, (err, item) => {
    if (err) {
      return next(err);
    }
    if (item) {
      res.json(item);
    } else {
      next();
    }
  });
});
  




 
//Error stuff

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
 


 

