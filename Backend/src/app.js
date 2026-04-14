const express = require("express")
const cokieParser = require("cookie-parser")
const authRouter = require("./router/auth.route")

const app = express()
app.use(express.json())
app.use(cokieParser())

// register api
app.use("/api/auth", authRouter)

//logout api
app.use("/api/auth/login", authRouter)


module.exports = app