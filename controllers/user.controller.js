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

//fetch the list of all users
exports.findAll = async (req, res) => {
    let users
    let userTypeReq = req.query.userType
    let userStatusReq = req.query.userStatus
    let userNameReq = req.query.userNameReq

    users = await fetchAll(res)
    res.status(200).send(objectConverter.userResponse(users))
}

exports.findById = async (req, res) => {

}

exports.update = async (req, res) => {

}