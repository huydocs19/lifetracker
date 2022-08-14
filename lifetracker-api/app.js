const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const security = require("./middleware/security")
const authRoutes = require("./routes/auth")
const exerciseRoutes = require("./routes/exercise")
const nutritionRoutes = require("./routes/nutrition")
const sleepRoutes = require("./routes/sleep")
const activityRoutes = require("./routes/activity")
const {NotFoundError} = require("./utils/errors")

const app = express()

// enable cross-origin resource sharing for all origins for all requests
// NOTE: in production, we'll want to restrict this to only the origin
// hosting our frontend.
app.use(cors())
// parse incoming requests with JSON payloads
app.use(express.json())
// log requests info
app.use(morgan("tiny"))
// extract user from jwt token sent in authorization header
// attach credentials to res.locals.user
app.use(security.extractUserFromJwt)

// routes
app.use("/auth", authRoutes)
app.use("/exercise", exerciseRoutes)
app.use("/nutrition", nutritionRoutes)
app.use("/sleep", sleepRoutes)
app.use("/activity", activityRoutes)

// health check
app.get("/", function (req, res) {
  return res.status(200).json({
    ping: "pong",
  })
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