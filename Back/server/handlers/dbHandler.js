const mongo = require('mongodb');
const turf = require('@turf/turf');
const MongoClient = mongo.MongoClient;
const mongoUri = "mongodb://adminhaim:adminhaim@ds155299.mlab.com:55299/openshelter";
const units = {units: 'meters'};

const connection = closure => MongoClient.connect(mongoUri, (err, db) => {
    if (err) return console.log(err);
    closure(db.db("openshelter"));
});



exports.getNearestShelter = (location) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection("shelters").find({}).toArray().then(shelters => {
                let bestShelter = shelters[0];

                shelters.forEach(shelter =>{
                    if(turf.distance(location, shelter.geometry.coordinates, units) < 500 &&
                        turf.distance(location, shelter.geometry.coordinates, units) <  turf.distance(location, bestShelter.geometry.coordinates, units))
                        bestShelter = shelter;
                });
                bestShelter.distance = Math.round(turf.distance(location, bestShelter.geometry.coordinates, units));
                resolve(bestShelter);
            }).catch(err=>{
                reject(err);
            });
        });
    });
};

exports.getNearestBuilding = (location) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection("buildings").find({}).toArray().then(buildings => {
                let bestBuilding = buildings[0];
                buildings.forEach(building =>{
                    if(turf.distance(location, building.geometry.coordinates, units) < 500 &&
                        turf.distance(location, building.geometry.coordinates, units) <  turf.distance(location, bestBuilding.geometry.coordinates, units))
                        bestBuilding = building;
                });
                bestBuilding.distance = Math.round(turf.distance(location, bestBuilding.geometry.coordinates, units));
                resolve(bestBuilding);
            });
        });
    })
};

exports.updateCounter = (shelter_info) => {
    return new Promise((resolve, reject) => {
        connection(db => {
            db.collection("shelter_info").findOne({"_id" : shelter_info._id}).then(shelter => {
                console.log(shelter);
                if(!shelter){
                    shelter_info.people_counter = 1;
                   db.collection("shelter_info").insertOne(shelter_info)
                   .then(() => {
                       resolve(true);
                   });
                }
                else{
                    db.collection("shelter_info").updateOne(
                        {
                            "_id" : shelter_info._id
                        },
                        {
                            $inc:{ "people_counter" : 1 }
                        })
                        .then(() => {
                            resolve(true);
                        });
                }
            }).catch(err => {
                reject(err);
            })
        })
    });
};


exports.registerUser = (user) => {
    return new Promise((reject, resolve) => {
        connection(db => {
            db.collection("users").insertOne(user).then((data) => {
                resolve(data.ops[0]);
            }).catch(err => {
                reject(err);
            })
        })
    });
};


exports.loginUser = (user) => {
    return new Promise((reject, resolve) => {
        connection(db => {
            db.collection("users").insertOne(user).then((data) => {
                resolve(data.ops[0]);
            }).catch(err => {
                reject(err);
            })
        })
    });
};

exports.updateUserDetails = (user) => {
    return new Promise((reject, resolve) => {
        connection(db => {
            db.collection("users").findOneAndUpdate(
                {
                    "_id" : user._id
                },
                {
                    $set: {
                        email: user.email,
                        password: user.password,
                        fullName: user.fullName,
                        phone: user.phone

                    }
                })
                .then(() => {
                    resolve(true);
            }).catch(err => {
                reject(err);
            })
        })
    });
};