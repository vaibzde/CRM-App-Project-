
const dbConfig = require(`./configs/db.config`)
const mongoose = require(`mongoose`)
const express = require(`express`)

const app = express()
app.use(express.json())


mongoose.connect(dbConfig.DB_URL,
    ()=> {console.log("Notification service connected to mongoDB")},
    err => {console.log("Error: ", err.message)}
    )

require("./routes/ticketNotification.routes")(app)

    app.listen(3030, ()=> {
        console.log("Notification App started on the port num 3030")
    })