const nodemailer = require(`nodemailer`)

module.exports = nodemailer.createTransport({
    service : `gmail`,
    debug : true,
    auth : {
        user: undefined ,//email in string
        pass: undefined //App generator password after double verification
    }
})  
  