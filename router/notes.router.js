'use strict';

// INSERT EXPRESS APP CODE HERE...
const express = require('express');

const router = express.Router();

//Simple in-memory database
const data = require('../db/notes');

const simDB = require('../db/simDB');

const notes = simDB.initialize(data);

//End points

//Get all notes and Search titles using a search term...
router.get('/', (req, res, next) => {
  const { searchTerm } = req.query;

  console.log('hello get 1');

  notes.filter(searchTerm, (err, list) => {
    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array

  });
});
 

//Get note by id#
router.get('/:id',(req,res, next) => {
 
  const noteById = req.params.id;

  notes.find(noteById, (err,list) => {

    if (err) {
      return next(err); // goes to error handler
    }
    res.json(list); // responds with filtered array

  });
 
});
 

//PUT updates a note
router.put('/:id', (req, res, next) => {
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


module.exports = router;


