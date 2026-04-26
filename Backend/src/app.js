const express = require("express")
const cokieParser = require("cookie-parser")

const authRouter = require("./router/auth.routes")
const postRouter = require("./router/post.routes")
const userRouter = require("./router/user.routes")

// middleware
const app = express()
app.use(express.json())
app.use(cokieParser())


// authentication routes
app.use("/api/auth", authRouter)

// post routes
app.use("/api/posts", postRouter)

// user routes
app.use("/api/users", userRouter)



module.exports = app