const Exercise = require("../models/exercise")
const Nutrition = require("../models/nutrition")
const Sleep = require("../models/sleep")
const { ForbiddenError } = require("../utils/errors")

/**
 * Checks to make sure that the authenticated user is the owner of the listing.
 * If they aren't, throws a ForbiddenError.
 * Otherwise, attaches the listing to res.locals
 *
 */
const authedUserIsExerciseOwner = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { exerciseId } = req.params
    const exercise = await Exercise.fetchExerciseById(exerciseId)

    if (exercise.username !== user.username) {
      throw new ForbiddenError("User is not allowed to other users' exercises")
    }

    return next()
  } catch (err) {
    return next(err)
  }
}
const authedUserIsNutritionOwner = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { nutritionId } = req.params
    const nutrition = await Nutrition.fetchNutritionById(nutritionId)

    if (nutrition.username !== user.username) {
      throw new ForbiddenError("User is not allowed to other users' nutritions")
    }

    return next()
  } catch (err) {
    return next(err)
  }
}

const authedUserIsSleepOwner = async (req, res, next) => {
  try {
    const { user } = res.locals
    const { sleepId } = req.params
    const sleep = await Sleep.fetchSleepById(sleepId)

    if (sleep.username !== user.username) {
      throw new ForbiddenError("User is not allowed to other users' sleep")
    }

    return next()
  } catch (err) {
    return next(err)
  }
}


module.exports = {
  authedUserIsExerciseOwner, 
  authedUserIsNutritionOwner,
  authedUserIsSleepOwner
}