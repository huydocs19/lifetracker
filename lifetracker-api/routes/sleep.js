const express = require("express")
const Sleep = require("../models/sleep")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
const router = express.Router()

router.post("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const user = res.locals.user
    const sleep = await Sleep.createSleep({ newSleep: req.body.sleep, user })
    return res.status(201).json({ sleep  })
  } catch (err) {
    next(err)
  }
})

router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const user = res.locals.user
    const sleep = await Sleep.listSleepFromUser(user)
    return res.status(200).json({ sleep })
  } catch (err) {
    return next(err)
  }
})

router.get("/:sleepId", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const sleep = await Sleep.fetchSleepById(req.params.sleepId)
    return res.status(200).json({ sleep })
  } catch (err) {
    return next(err)
  }
})
router.put("/:sleepId/update", security.requireAuthenticatedUser, 
permissions.authedUserIsSleepOwner, async function (req, res, next) {
  try {        
    const user = res.locals.user
    const sleep = await Sleep.updateSleep({sleepId: req.params.sleepId, updatedSleep: req.body.sleep, user})    
    return res.status(200).json({ sleep })
  } catch (err) {
    next(err)
  }
})
router.delete("/:sleepId/delete", security.requireAuthenticatedUser, 
permissions.authedUserIsSleepOwner, async function (req, res, next) {
  try {
    const sleep = await Sleep.deleteSleep(req.params.sleepId)    
    return res.status(200).json({ sleep })
  } catch (err) {
    next(err)
  }
})

module.exports = router