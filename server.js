'use strict';

console.log('Hello Noteful!');
 
const { PORT } = require('./config');

//onst accessLogging = require('./middleware/logger');

const morgan = require('morgan');

const notesRouter = require('./router/notes.router');

 
// INSERT EXPRESS APP CODE HERE...
const express = require('express');

// Load array of notes



// Create an express application
const app = express();

// Log all requests
//app.use(accessLogging);
app.use(morgan('dev'));

// Create a static webserver
app.use(express.static('public'));//very important

// Parse request body
app.use(express.json());

// Routes
app.use('/api/notes/',notesRouter);
 
  
 
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
 


 

