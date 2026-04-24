// env file is required for using environment variables in the application
require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/database")

//connect to database
connectToDb()

//start the server
app.listen(3000, ()=>{
    console.log("app is running on port 3000")
})

