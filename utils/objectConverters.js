exports.userResponse = (users) => {
    let userResult = []
    users.forEach(user => {
        userResult.push({
            name : user.name,
            userId : user.userId,
            email : user.email,
            userType : user.userType,
            userStatus : user.userStatus
        })
    })
    return userResult
}

exports.ticketResponse = (ticket) => {
    return {
        title: ticket.title,
        ticketPriority : ticket.ticketPriority,
        
    }
}

exports.ticketListResponse = (tickets) => {
    ticketResult = []
    tickets.forEach(ticket => {
        return ticketResult.push(exports.ticketResponse)
        })
        return ticketResult
}