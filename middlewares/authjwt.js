const jwt = require("jsonwebtoken")
const authConfig = require("../configs/auth.config")

verifyToken = (req, res, next) => {
    let token = req.header[`x-access-token`]

    if(!token) {
        return res.status(403).send({
            message : "No taken provided!"
        })
    }

    jwt.verify(token, authConfig.secret, (err, decode) => {
        if(err, decode){
            return res.status(401).send(
                {
                    message : "Unauthorized!"
                }
            )
        }
        req.body.userId = decode.id
        next()
    })
}
//middleware exist between routers and controllers..
