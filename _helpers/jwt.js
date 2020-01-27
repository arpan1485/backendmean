const expressJwt = require('express-jwt');
const config = require('../config.json');
var user = require('../model/user.js');


module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            // public routes that don't require authentication
            '/api/login',
            '/api/registerUsers'
        
        ]
    });
}

async function isRevoked(req, payload, done) {
  //  const user = await userService.getById(payload.sub);
 const userget=  user.findById(payload.sub).select('-hash');

    // revoke token if user no longer exists
    if (!userget) {
        return done(null, true);
    }

    done();
};