const jwt = require('jsonwebtoken');

exports.getToken = user => new Promise(resolve => {
    let token = jwt.sign(
        {
            data: email
        },
        user.password,
        {
            expiresIn: 1800
        }
    ); //30 minutes is 1800 secondes
    resolve(token);
});

exports.verifyToken = user => new Promise(resolve => {
    jwt.verify(user.sessionId, user.password, (err, decoded) => {
        if(err)
            resolve(err);
        else
            resolve(decoded);
    });
});



