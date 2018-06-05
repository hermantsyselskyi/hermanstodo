const express = require('express');

//Making a new router
const router = express.Router();
//Connecting Schema to our router
const ToDo = require('../modules/todo.schema');
//Post
router.post('/', (req, res) => {
//Creating new object in our Schema(Server) with (req.body)
    ToDo.create( req.body )
    .then(() => {
//We are good server
        res.sendStatus(201);
    }).catch((error) => {
//Console loggin error
        console.log('Error ',Error);
        res.sendStatus(500);
    })
});
//Get
router.get('/', (req, res) => {
//Getting our info from server
    ToDo.find({})
//Returning Data back
    .then((data) => {
//We are good server
        res.send(data);
    }).catch((error) => {
//Console loggin error
        console.log('Error ',Error);
        res.sendStatus(500);
    })
});
//Put
router.put('/:id', (req, res) => {
//Getting params of object. Console logging this stuff
    console.log('put', req.body);
    console.log('put params', req.params);
//Updating ID with mongoose method .findByIdAndUpdate
    ToDo.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
        res.sendStatus(200);
//We are good server
    }).catch((error) => {
        console.log('Error ',Error);
        res.sendStatus(500);
    })
});
//Delete
router.delete('/:id', (req, res) => {
//Getting params of object. Console logging this stuff
    console.log('delete', req.params);
//Getting ID of object and Deleting it
    ToDo.findByIdAndRemove(req.params.id)
    .then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error ',Error);
        res.sendStatus(500);
        
    })
})
// Of course we not gonna forget about our module.exports..
module.exports = router;