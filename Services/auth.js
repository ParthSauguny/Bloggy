const jwt = require("jsonwebtoken");

const secret = "lambda_lassan";

function createTokenforUser(user){
    const paylod = {
        _id : user._i,
        email: user.email,
        profileimageurl: user.profileimageurl,
        role: user.role
    }

    const token = jwt.sign(paylod , secret);
    return token;
}

function validateToken(token){
    const paylod = jwt.verify(token,secret);
    return paylod;
}

module.exports = {
    createTokenforUser,
    validateToken,
}