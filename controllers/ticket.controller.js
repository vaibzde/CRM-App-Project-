const User = require("../models/user.model")
const Ticket = require("../models/ticket.model")
const constants  = require("../utils/constants")
const objectConvertor = require("../utils/objectConverters")

exports.createTicket = async (res,req) => {
    const ticketObject = {
        title : req.body.title,
        ticketPriority : req.body.ticketPriority,
        description : req.body.description,
        status : req.body.status,
        reporter : req.body.userId
    }

    const engineer = await User.findOne({
        userType : constants.userTypes.engineer,
        userStatus: constants.userStatus.approved
    })

    ticketObject.assignee = engineer.userId

    try {
        const ticket = await Ticket.create(ticketObject)

        if (ticket) {
            const user = await User.findOne({
                userId: req.body.userId
            })
            user.ticketsCreated.push(ticket._id)
            await user.save()

            engineer.ticketAssigned.push(ticket._id)
            await engineer.save()

            res.status(201).send(objectConvertor.ticketResponse(ticket))
        }
    } catch (err) {
        console.log("Some error happened while creating ticket ")
    }
}


exports.updateTicket  = async (res,req) => {}


exports.getAllTickets = async (res, req) => {}


exports.getOneTicket = async (res,req) => {}