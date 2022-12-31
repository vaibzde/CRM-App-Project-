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
        console.log("Some error happened while creating ticket ", err.message )
        res.status(500).send({
            message: "Some internal server error"
        })
    }
}

const canUpdate = (user, ticket) => {
    return user.userId == ticket.reporter ||
            user.userId == ticket.assignee ||
            user.userType == constants.userTypes.admin
}

exports.updateTicket  = async (res,req) => {
    const ticket = await Ticket.findOne({_id : req.param.id})

    const savedUser = await User.findOne({
        userId: req.body.userId 
    })

    if(canUpdate(savedUser, ticket)){
            ticket.title = req.body.title != undefined
                                    ? req.body.title
                                    : ticket.title
            ticket.description = req.body.description != undefined
                                    ? req.body.description
                                    : ticket.description
            ticket.ticketPriority = req.body.ticketPriority != undefined
                                    ? req.body.ticketPriority
                                    : ticket.ticketPriority
            ticket.status = req.body.status != undefined
                                    ? req.body.status
                                    : ticket.status
            ticket.assignee = req.body.assignee != undefined
                                ? req.body.assignee
                                : ticket.assignee
            await ticket.save()
            res.status(200).send(objectConvertor.ticketResponse(ticket))
    } else {
        console.log("Ticket update was attempted by someone without access to the ticket")
        res.status(401).send({
            message : "Ticket can only be created by the customer who created"
        })
    }

}


exports.getAllTickets = async (res, req) => {}


exports.getOneTicket = async (res,req) => {}