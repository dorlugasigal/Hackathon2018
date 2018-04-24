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
//router.get('/getStreetLights', getStreetLights);

module.exports = router;

function getNearestShelter(req,res,next){
    try{
        const shelter = await dbHandler.getNearestShelter(req.query.location);
        res.send(shelter);
    }
    catch(err){
        res.send(err);
    }
}

function registerUser(req,res,next){
    try{
        const user = await accountHandler.register(req.body.user);
        res.send(user);
    }
    catch(err){
        res.send(err);
    }
}

function updateDetails(req,res,next){
    try{
        const user = await accountHandler.updateDetails(req.body.user);
        res.send(user);
    }
    catch(err){
        res.send(err);
    }
}

function updateCounter(req,res,next){
    try{
        const shelter_info = await dbHandler.updateCounter(req.body.shelterInfo);
        res.send(shelter_info);
    }
    catch(err){
        res.send(err);
    }
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