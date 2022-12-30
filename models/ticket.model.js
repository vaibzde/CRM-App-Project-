const mongoose = require("mongoose")
const {ticketStatus} = require(`../utils/constants`)

const ticketSchema = new mongoose.Schema({
    title: {
        type : String,
        required: true,
    },
    ticketPriority: {
        type: Number,
        required: true,
        default: 4,//1 has the highest priority and 4 the lowest
    },
    description: {
        type : String,
        requird: true,
    },
    status: {
        type : String,
        required : true,
        default : ticketStatus.open,
    },
    reporter :  {
        type : String,
    },
    assignee : {
        type : String,
    },
    createdAt : {
        type : Date,
        immutable : true,
        default : () => date.now()
    },
    updatedAt: {
        type : Date,
        default : () => Date.now(),
    },
    ticketsCreated  :{
        type : [mongoose.SchemaTypes.ObjectId],
        ref: "Ticket"
    },
    ticketsAssigned: {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    }
})

module.exports = mongoose.model("Ticket", ticketSchema)