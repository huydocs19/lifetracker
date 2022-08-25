const request = require("supertest")
const app = require("../app")

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,  
} = require("../tests/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("GET /activity", () => {  
  test("Return the correct summary stats if authed user can has activities", async () => {
    const res = await request(app).get(`/activity`).set("authorization", `Bearer ${testTokens.jloToken}`)
    expect(res.statusCode).toEqual(200)
    
    const testSummaryStats = {
      exerciseSummaryStats: {
        totalExerciseMinutes: 50, avgExerciseIntensity: 5.5
      },
      nutritionSummaryStats: {
        avgDailyCalories: 565, maxCalories: 565
      },
      sleepSummaryStats: {
        avgSleepHours: 8.5, totalSleepHours: 17
      }
    } 
    const summaryStats = res.body        
    summaryStats.exerciseSummaryStats.avgExerciseIntensity = Math.round((Number(summaryStats.exerciseSummaryStats.avgExerciseIntensity) + Number.EPSILON) * 100) / 100
    summaryStats.nutritionSummaryStats.avgDailyCalories = Math.round((Number(summaryStats.nutritionSummaryStats.avgDailyCalories) + Number.EPSILON) * 100) / 100
    summaryStats.sleepSummaryStats.avgSleepHours = Math.round((Number(summaryStats.sleepSummaryStats.avgSleepHours) + Number.EPSILON) * 100) / 100
    summaryStats.exerciseSummaryStats.totalExerciseMinutes = Number(summaryStats.exerciseSummaryStats.totalExerciseMinutes)
    summaryStats.nutritionSummaryStats.maxCalories = Number(summaryStats.nutritionSummaryStats.maxCalories)
    summaryStats.sleepSummaryStats.totalSleepHours = Number(summaryStats.sleepSummaryStats.totalSleepHours)
    expect(summaryStats).toEqual(testSummaryStats)
  })

  test("Return 0 for all fields if authed user doesn't have any activities", async () => {
    const res = await request(app).get(`/activity`).set("authorization", `Bearer ${testTokens.lebronToken}`)
    expect(res.statusCode).toEqual(200)
    const testSummaryStats = {
      exerciseSummaryStats: {
        totalExerciseMinutes: 0, avgExerciseIntensity: 0
      },
      nutritionSummaryStats: {
        avgDailyCalories: 0, maxCalories: 0
      },
      sleepSummaryStats: {
        avgSleepHours: 0, totalSleepHours: 0
      }
    }   
    const summaryStats = res.body        
    summaryStats.exerciseSummaryStats.avgExerciseIntensity = Math.round((Number(summaryStats.exerciseSummaryStats.avgExerciseIntensity) + Number.EPSILON) * 100) / 100
    summaryStats.nutritionSummaryStats.avgDailyCalories = Math.round((Number(summaryStats.nutritionSummaryStats.avgDailyCalories) + Number.EPSILON) * 100) / 100
    summaryStats.sleepSummaryStats.avgSleepHours = Math.round((Number(summaryStats.sleepSummaryStats.avgSleepHours) + Number.EPSILON) * 100) / 100
    summaryStats.exerciseSummaryStats.totalExerciseMinutes = Number(summaryStats.exerciseSummaryStats.totalExerciseMinutes)
    summaryStats.nutritionSummaryStats.maxCalories = Number(summaryStats.nutritionSummaryStats.maxCalories)
    summaryStats.sleepSummaryStats.totalSleepHours = Number(summaryStats.sleepSummaryStats.totalSleepHours)
    expect(summaryStats).toEqual(testSummaryStats)
  })
})