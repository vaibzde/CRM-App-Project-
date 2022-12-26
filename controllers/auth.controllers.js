const User = require("../models/user.model")
const { userTypes } = require("../utils/constants")
const constants = require("../utils/constants")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require("../configs/auth.config")


exports.signup = async (req, res) => {
    let userStatus

    if (req.body.userType == userTypes.engineer ||
        req.body.userType == userTypes.admin) {
        userStatus = constants.userStatus.pending
    } else {
        userStatus = constants.userStatus.approved
    }

    console.log(req)
    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: bcrypt.hashSync(req.body.password, 8),
        userStatus: userStatus
    }

    try {
        const userCreated = await User.create(userObj)
        const postReponse = {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }
        res.status(201).send(postReponse)
    } catch (err) {
        console.log("Something went wrong while saving to DB", err.message)
        res.status(500).send({
            message: "Some internal error while inserting the element"
        })
    }
}

<<<<<<< Updated upstream
// exports.signin = async(req, res) => {
=======
exports.signin = async(req, res) => {
    const user = await User.findOne({userId : req.body.userId})
=======
exports.signin = async(req, res) => {
    const user = await User.find({userId : req.body.userId})
>>>>>>> cb17b644ae68780ee06368af630f74321ef5ce02
    console.log(user)
    if(!user){
        res.status(400).send({
            message : "UserId, doesn't exist"
        })
        return
    }
<<<<<<< HEAD

    if(user.userStatus != constants.userStatus.approved){
        res.status(403).send({
            message : `Can't allow login as user is in status : [${user.userStatus}]`
        })
        return
    }

    let passwordIsValid = bcrypt.compareSync(
        req.body.password, user.password
    )

    if(!passwordIsValid){
        res.status(401).send({
            accessToken : null,
            message : "Wrong Password"
        })
        return
    }

    let token = jwt.sign({id : user.userId}, config.secret, {
        expiresIn: 86400  // 24hrs
    })
>>>>>>> Stashed changes
=======
>>>>>>> cb17b644ae68780ee06368af630f74321ef5ce02

    if(user.userStatus != constants.userStatus.approved){
        res.status(403).send({
            message : `Can't allow login as user is in status : [${user.userStatus}]`
        })
        return
    }

    let passwordIsValid = bcrypt.compareSync(
        req.body.password, user.password
    )

    if(!passwordIsValid){
        res.status(401).send({
            accessToken : null,
            message : "Wrong Password"
        })
        return
    }

    let token = jwt.sign({id : user.userId}, config.secret, {
        expiresIn: 86400  // 24hrs
    })

    res.status(200).send({
        name : user.name,
        userId : user.userId,
        email: user.email,
        userTypes : user.userTypes,
        userStatus : user.userStatus,
        accessToken : token
    })
}