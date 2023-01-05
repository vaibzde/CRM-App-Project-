const TicketNotificationModel = require("../models/ticketNotification.model")

//This controller adds a new notification to our db
exports.acceptNotificationRequest = async (req, res) => {
    const notificationObject = {
        subject: req.body.subject,
        content: req.body.content,
        recepientEmails: req.body.recepientEmails,
        requester: req.body.requester,
        ticketId: req.body.ticketId,
    }

    try {
        const notification = await TicketNotificationModel.create(
            notificationObject
        )
        res.status(200).send({
            requestId: notification.ticketId,
            status: "Accepted Request"
        })
    } catch (err) {
        console.log(`Error while accepting a notification request ${err.message}`)
        res.status(500).send({
            message: "Internal Server Error"
        })
    }
}


// this controller tells the client the current status of a notification
exports.getNotificationStatus = async (req, res) => {

    const reqID = req.params.id;

    try {
        const notification  = await TicketNotificationModel.findOne({
            ticketId: reqID;
        })

        req.status(200).send({
            requestId : notification.ticketId,
            subject : notification.subject,
            content : notification.content,
            recepientEmails: notification.receipientEmails,
            sentStatus : notification.sentStatus
        })
    } catch (err) {
        console.log("Error while fetching a notification request: ", err.message)
    }
}