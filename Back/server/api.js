const express = require('express'),
      fs = require('fs'),
      path = require('path'),
      moment = require("moment"),
      turf = require("@turf/turf"),
      dbHandler = require('./handlers/dbHandler');

const router = express.Router();

router.get('/getNearestShelter', getNearestShelter);
router.post('/registerUser', registerUser);
router.post('/updateDetails', updateDetails);
router.post('/updateCounter', updateCounter);

module.exports = router;

function getNearestShelter(req,res,next){
    dbHandler.getNearestShelter(turf.point([34.7891986, 31.2499399])).then(shelter => {
        if(shelter.distance < 500)
            res.send(shelter);
        else {
            dbHandler.getNearestBuilding(turf.point([34.7891986, 31.2499399])).then(building => {
                if(building.distance < 500)
                    res.send(building);
                else
                    res.send(false);
            }).catch(err => {
                res.send(err);
            });
        }
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