const mongoose = require("mongoose")


const ticketNotificationSchema = new mongoose.Schema({
subject : {//take subject as in email
    type : String,
    required : true,
},
ticketId : {
    type: String,
    require: true,
},
content : {
    type: String,
    required : true,
},
receipientEmails: {
    type: [String],
    required : true,
},
sentStatus : {
    type: String,
    required: true,
    default: "UN_SENT",
},
requester: {
    type: String
},
createdAt: {
    type: Date,
    immutable: true,
    default: () => {
        return Date.now()
    }
},
updatedAt: {
    type: Date,
    required: true,
    default: () => {
        return Date.now()
    }
},

})

module.exports = mongoose.model("TicketNotification", ticketNotificationSchema)