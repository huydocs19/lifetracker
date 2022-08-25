const express = require("express")
const Exercise = require("../models/exercise")
const security = require("../middleware/security")
const permissions = require("../middleware/permissions")
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

router.get("/:exerciseId", security.requireAuthenticatedUser, 
permissions.authedUserIsExerciseOwner, async function (req, res, next) {
  try {
    const { exercise } = res.locals   
    return res.status(200).json({ exercise })
  } catch (err) {
    return next(err)
  }
})
router.put("/:exerciseId/update", security.requireAuthenticatedUser, 
permissions.authedUserIsExerciseOwner, async function (req, res, next) {
  try {        
    const exercise = await Exercise.updateExercise({exerciseId: req.params.exerciseId, updatedExercise: req.body.exercise})    
    return res.status(200).json({ exercise })
  } catch (err) {
    next(err)
  }
})
router.delete("/:exerciseId/delete", security.requireAuthenticatedUser, 
permissions.authedUserIsExerciseOwner, async function (req, res, next) {
  try {
    const exercise = await Exercise.deleteExercise(req.params.exerciseId)    
    return res.status(200).json({ exercise })
  } catch (err) {
    next(err)
  }
})

module.exports = router