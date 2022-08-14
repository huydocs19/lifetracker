const express = require("express")
const Exercise = require("../models/exercise")
const security = require("../middleware/security")
const router = express.Router()

router.post("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const user = res.locals.user    
    const exercise = await Exercise.createExercise({ newExercise: req.body.exercise, user })    
    return res.status(201).json({ exercise })
  } catch (err) {
    next(err)
  }
})

router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const user = res.locals.user
    const exercises = await Exercise.listExercisesFromUser(user)
    return res.status(200).json({ exercises })
  } catch (err) {
    return next(err)
  }
})

router.get("/:exerciseId", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const exercise = await Exercise.fetchExerciseById(req.params.exerciseId)
    return res.status(200).json({ exercise })
  } catch (err) {
    return next(err)
  }
})

module.exports = router