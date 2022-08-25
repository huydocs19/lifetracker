const { createUsers, jloToken, lebronToken, adminToken } = require("./createUsers")
const { createExercises } = require("./createExercises")
const { createNutritions } = require("./createNutritions")
const { createSleeps } = require("./createSleeps")
const db = require("../db.js")

const testExerciseIds = []
const testNutritionIds = []
const testSleepIds = []
const testTokens = { jloToken, lebronToken, adminToken }

async function commonBeforeAll() {
  // delete all current test data
  await db.query(`DELETE FROM exercises`)
  await db.query(`DELETE FROM nutritions`)
  await db.query(`DELETE FROM sleeps`)
  await db.query(`DELETE FROM users`)

  // insert fresh test data
  const userIds = await createUsers()
  const exerciseIds = await createExercises(userIds)

  for (let i = 0; i < exerciseIds.length; i++) {
    testExerciseIds.push(exerciseIds[i])
  }

  const nutritionIds = await createNutritions(userIds)

  for (let i = 0; i < nutritionIds.length; i++) {
    testNutritionIds.push(nutritionIds[i])
  }
  
  const sleepIds = await createSleeps(userIds)
  

  for (let i = 0; i < sleepIds.length; i++) {
    testSleepIds.push(sleepIds[i])
  }
}

async function commonBeforeEach() {
  await db.query("BEGIN")
}

async function commonAfterEach() {
  await db.query("ROLLBACK")
}

async function commonAfterAll() {
  await db.end()
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testExerciseIds,
  testNutritionIds,
  testSleepIds,
  testTokens,
}