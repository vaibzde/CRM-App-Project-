const cron = require(`node-cron`)
const TicketNotificationModel = require("../models/ticketNotification.model")
const EmailTransporter = require(`../notifier/emailService`)
cron.schedule(`*/5 * * * * *`, async () => {
    const notifications = await TicketNotificationModel.find({
        sentStatus: "UN_SENT"
    })

    console.log(`Count of unsent notification: ${notifications.length}`)

    notifications.forEach(notifications => {
        const mailData = {
            from: `crm-notification-service@gmail.com`,//example,
            to: notifications.receipientEmails,
            subject: notifications.subject,
            text: notifications.content,
        }
        console.log(mailData)

        EmailTransporter.sendMail(mailData, async(err,info) => {
            if(err) {
                console.log(err.message)
            } else {
                console.log(info)
                const savedNotification = await TicketNotificationModel.findOne(_id: notifications._id)
                savedNotification.sentStatus = "SENT"
                await savedNotification.save()
            }
        })
    })

})