const express = require("express")
const Nutrition = require("../models/nutrition")
const security = require("../middleware/security")
const router = express.Router()

router.post("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const user = res.locals.user
    const nutrition = await Nutrition.createNutrition({ newNutrition: req.body.nutrition, user })
    return res.status(201).json({ nutrition })
  } catch (err) {
    next(err)
  }
})

router.get("/", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const user = res.locals.user
    const nutritions = await Nutrition.listNutritionsFromUser(user)
    return res.status(200).json({ nutritions })
  } catch (err) {
    return next(err)
  }
})

router.get("/:nutritionId", security.requireAuthenticatedUser, async function (req, res, next) {
  try {
    const nutrition = await Nutrition.fetchNutritionById(req.params.nutritionId)
    return res.status(200).json({ nutrition })
  } catch (err) {
    return next(err)
  }
})

module.exports = router