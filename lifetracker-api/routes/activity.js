const express = require("express")
const Activity = require("../models/activity")
const security = require("../middleware/security")
const router = express.Router()


router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const user = res.locals.user    
    const summaryStats = await Activity.getSummaryStats(user)     
    return res.status(200).json(summaryStats)
  } catch (err) {
    return next(err)
  }
})

module.exports = router