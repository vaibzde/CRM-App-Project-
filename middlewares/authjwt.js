const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")
const constants = require("../utils/constants")
const { userTypes } = require("../utils/constants")
const User = require("../models/user.model")

const verifyToken = (req, res, next) => {
    let token = req.header[`x-access-token`]

    if(!token) {
        return res.status(403).send({
            message : "No token provided!"
        })
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if(err, decoded){
            return res.status(401).send(
                {
                    message : "Unauthorized!"
                }
            )
        }
        req.body.userId = decoded.id
        next()
    })
}
//middleware exist between routers and controllers..

const isAdmin = async(req, res, next) => {
    const user = await User.findOne({
        userId: req.body.userId
    })
    if(user && userTypes == constants.userTypes.admin){
        next();
    }else {
        res.status(403).send({
            message: "Require Admin Role!"
        })
        return
    }
}

module.exports = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
}

