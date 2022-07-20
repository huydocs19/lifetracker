const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const {NotFoundError} = require("./utils/errors")
const User = require("./models/user")

const app = express()

app.use(morgan("tiny"))
app.use(express.json())
app.use(cors())


app.post("/login", async (req, res, next) => {
    try {
      // take the user's email and password and attempt to authenticate them
      const user = await User.login(req.body)
      res.status(200).json({user})
    } catch (err) {
      next(err)
    }
})

app.post("/register", async (req, res, next) => {
    try {
      // take the user's info (e.g. name, email and password) and create a new
      // user in our database 
      const user = await User.register(req.body)
      res.status(200).json({user})
    } catch (err) {
      next(err)
    }
})
/* Handle all 404 errors that weren't matched by a route */
app.use((req, res, next) => {
  return next(new NotFoundError())
})

/* Generic error handler - anything that is unhandled will be handled here */
app.use((error, req, res, next) => {
  const status = error.status || 500
  const message = error.message

  return res.status(status).json({
    error: { message, status },
  })
})

module.exports = app