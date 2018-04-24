const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const mongoUri = "mongodb://adminhaim:adminhaim@ds155299.mlab.com:55299/openshelter";


const connection = closure => MongoClient.connect(mongoUri, (err, db) => {
    if (err) return console.log(err);
    closure(db.db("openshelter"));
});



exports.getNearestShelter = (location) => {
    return new Promise((resolve, reject) => {

    });
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
