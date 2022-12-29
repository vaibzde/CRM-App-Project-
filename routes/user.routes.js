const authJwt = require("../middlewares/authjwt")
const userController = require("../controllers/user.controller")

module.exports = function(app){
    app.get(`/crm/api/users/`, [authJwt.verifyToken, authJwt.isAdmin], 
    userController.findAll)
}

//here [authJwt is the middleware]
//jere how the routing is done
//example - jwt token -> userID -> response

