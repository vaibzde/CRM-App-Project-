const authController = require("../controllers/auth.controllers")

module.exports = function(app) {
    app.post(`/crm/api/auth/signup`, authController.signup),
   
    app.post(`/crm/api/auth/signin`, authController.signin)
}