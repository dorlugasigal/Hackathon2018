const express = require('express'),
      fs = require('fs'),
      path = require('path'),
      moment = require("moment"),
      accountHandler = require('./handlers/accountHandler'),
      dbHandler = require('./handlers/dbHandler');

const router = express.Router();

router.get('/getNearestShelter', getNearestShelter);
router.post('/registerUser', registerUser);
router.post('/updateDetails', updateDetails);
router.post('/updateCounter', updateCounter);

module.exports = router;

function getNearestShelter(req,res,next){
    dbHandler.getNearestShelter(req.query.location).then(shelter => {
        res.send(shelter);
    }).catch(err => {
        res.send(err);
    });
}

function registerUser(req,res,next){
    dbHandler.registerUser(req.body.user).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    });
}

function updateDetails(req,res,next){

    dbHandler.updateUserDetails(req.body.user).then(data => {
            res.send(data);
    }).catch(err => {
        res.send(err);
    });
}

function updateCounter(req,res,next){

    dbHandler.updateCounter(req.body.shelterInfo).then(data => {
        res.send(data);
    }).catch(err => {
        res.send(err);
    });
}

function getStreetLights(req,res,next){
    try{
        const user = await dbHandler.getStreetLights(req.body.location);
        res.send(user);
    }
    catch(err){
        res.send(err);
    }
}