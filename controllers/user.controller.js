/*
CONTROLLERS FOR THE USER RESOURCES..

Only the user of type ADMIN should able to perform the operations
defined in the user controller
*/

const User = require(`../models/user.model`)
const objectConverter = require(`../utils/objectConverters`)

const fetchAll = async (res) => {
    let users;
    try {
        users = await User.find()
    } catch(err) {
        console.log("Error while fetching the users")
        res.status(500).send({
            message : "Some internal error occured"
        })
    }
  return users;
}

const fetchByName = async (userNameReq, req) => {
    let users;
    try {
        users = await User.find({
            name : userNameReq
        })
    } catch(err) {
        console.log("Error while fetching the users")
        res.status(500).send({
            message : "Some internal error occured"
        })
    }
  return users;
}

const fetchByTypeAndStatus = async (userTypeReq, userStatusReq, req) => {
    let users;
    try {
        users = await User.find({
            userType: userTypeReq,
            userStatus: userStatusReq
        })
    } catch(err) {
        console.log("Error while fetching the users")
        res.status(500).send({
            message : "Some internal error occured"
        })
    }
  return users;
}

const fetchByType = async (userTypeReq, req) => {
    let users;
    try {
        users = await User.find({
            userType: userTypeReq
        })
    } catch(err) {
        console.log("Error while fetching the users")
        res.status(500).send({
            message : "Some internal error occured"
        })
    }
  return users;
}

const fetchByStatus = async (userStatusReq, req) => {
    let users;
    try {
        users = await User.find({
            userStatus: userStatusReq
        })
    } catch(err) {
        console.log("Error while fetching the users")
        res.status(500).send({
            message : "Some internal error occured"
        })
    }
  return users;
}

//fetch the list of all users
exports.findAll = async (req, res) => {
    let users
    let userTypeReq = req.query.userType
    let userStatusReq = req.query.userStatus
    let userNameReq = req.query.na me 

    if(userNameReq) {
        users = await fetchByName(userNameReq, res)
    } else if(userStatusReq && userTypeReq){
        users = await fetchByTypeAndStatus(userTypeReq, userStatusReq, res)
    } else if(userTypeReq){
        users = await fetchByType(userTypeReq,res)
    } else if(userStatusReq){
        users = await fetchByType(userStatusReq, res)
    } else {
    users = await fetchAll(res)
    }

    res.status(200).send(objectConverter.userResponse(users))
}


exports.findById = async (req, res) => {
    const userIdReq = req.params.userId
    let user
    try {
        user = await User.find({
            userId : userIdReq
        })
    } catch (err) {
            res.status(500).send({
                message : "Internal Server Error"
            })
    }
    if(user.length>0) {
        res.status(200).send(objectConverter.userResponse(user))
    } else{
        res.status(200).send({
            messgae : `User with this ${userIdReq} is not present`
        })
    }
} 

exports.update = async (req, res) => {
    const userIdReq = req.params.userId
    try {
        const user = await User.findOneAndUpdate({
            userId: userIdReq
        },{
            userStatus: req.body.userStatus
        }).exec() //exec() <- it will execute the code
    res.status(200).send({
        message : "User record has been updated successfully"
    })
    } catch (err) {
        console.error("Error while updating the record", err.message)
        res.status(500).send({
            message : "Some internal error occured"
        })
    }
}