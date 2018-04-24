const mongo = require('mongodb');
const turf = require('@turf/turf');
const MongoClient = mongo.MongoClient;
const mongoUri = "mongodb://adminhaim:adminhaim@ds155299.mlab.com:55299/openshelter";
const units = {units: 'meters'};
const t = require('../server/handlers/dbHandler');

//go to shelter

t.getNearestShelter(turf.point([34.7891986, 31.2499399])).then(shelter => {
    if(shelter.distance < 500)
        console.log("Go To Shelter");
    else {
        t.getNearestBuilding(turf.point([34.7891986, 31.2499399])).then(building => {
            if(building.distance < 500)
                console.log("go to building");
            else
                console.log("Take Cover");
        });
    }
});

//go to building
t.getNearestShelter(turf.point([34.7891986, 31.2499399])).then(shelter => {
    if(shelter.distance < 0)
        console.log("Go To Shelter");
    else {
        t.getNearestBuilding(turf.point([34.7891986, 31.2499399])).then(building => {
            if(building.distance < 500)
                console.log("go to building");
            else
                console.log("Take Cover");
        });
    }
});

//take cover
//go to building
t.getNearestShelter(turf.point([34.7891986, 31.2499399])).then(shelter => {
    if(shelter.distance < 0)
        console.log("Go To Shelter");
    else {
        t.getNearestBuilding(turf.point([34.7891986, 31.2499399])).then(building => {
            if(building.distance < 0)
                console.log("go to building");
            else
                console.log("Take Cover");
        });
    }
});


//getNearestBuilding
t.getNearestBuilding(turf.point([34.7891986, 31.2499399])).then(building => {
    if(building.distance < 500)
        console.log("go to building");
});


    //people counter
let shelter_info = {
    _id: "3",
    people_counter: 0
};
t.updateCounter(shelter_info).then(shelter=>{
    console.log(shelter);
});

