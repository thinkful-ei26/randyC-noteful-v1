'use strict';

const data = require('../db/notes');
const simDB = require('../db/simDB');
const notes = simDB.initialize(data);

// GET NOTES with search
notes.filter('cats',(err,list) => {

  if(err){

    console.error(err);

  }
  console.log(list);

});

// GET Notes by ID
notes.find(1005, (err,item) => {

  if(err) {

    console.error(err);

  }
  if(item) {

    console.log(item);

  } else {

    console.log('not found');

  }

});

// PUT (Update) Notes by ID
const updateObj = {

  title: 'New Title',
  content: 'Blah Blah B;ah'

};

notes.update(1005, updateObj, (err, item) => {

  if(err){

    console.error(err);

  }
  if (item) {

    console.log(item);

  } else {

    console.log('not found');

  }

});

// CREATE new note
const newObj = {

  title: 'New Note',
  content: 'This is a new note'

};

notes.create(newObj, (err,item) => {

  if(err){

    console.error(err);

  }
  if (item) {

    console.log(item);

  } else {

    console.log('not found');

  }


});


//DELETE note

const thisId = 1005;

notes.delete(thisId,(err,item) =>{

  if(err){

    console.error(err);

  }
  if (item) {

    console.log(item);

  } else {

    console.log('not found');

  }



});