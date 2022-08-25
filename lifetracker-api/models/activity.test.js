const Activity = require("./activity")
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,  
} = require("../tests/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

describe("Activity", () => {
  describe("Test getTotalExerciseMinutes", () => {
    test("Return the correct total exercise minutes if user has exercises", async () => {
      const user = { username: "jlo" }      
      const totalExerciseMinutes = await Activity.getTotalExerciseMinutes(user)
      
      expect(Number(totalExerciseMinutes)).toEqual(50)
    })
    test("Return 0 if user doesn't have any exercises", async () => {
      const user = { username: "lebron" }      
      const totalExerciseMinutes = await Activity.getTotalExerciseMinutes(user)
      
      expect(Number(totalExerciseMinutes)).toEqual(0)
    })
    
  })
  describe("Test getAverageSleepHours", () => {
    test("Return the correct average sleep hours if user has sleeps", async () => {
      const user = { username: "jlo" }      
      const avgSleepHours = await Activity.getAverageSleepHours(user)
      
      expect(Math.round((Number(avgSleepHours) + Number.EPSILON) * 100) / 100).toEqual(8.5)
    })
    test("Return 0 if user doesn't have any sleeps", async () => {
        const user = { username: "lebron" }      
        const avgSleepHours = await Activity.getAverageSleepHours(user)
        
        expect(Math.round((Number(avgSleepHours) + Number.EPSILON) * 100) / 100).toEqual(0)
      })
    
  })
  describe("Test getAverageDailyCalories", () => {
    test("Return the correct average daily calories if user has nutritions", async () => {
      const user = { username: "jlo" }      
      const avgDailyCalories = await Activity.getAverageDailyCalories(user)
      
      expect(Math.round((Number(avgDailyCalories) + Number.EPSILON) * 100) / 100).toEqual(565)
    })
    test("Return 0 if user doesn't have any nutritions", async () => {
      const user = { username: "lebron" }      
      const avgDailyCalories = await Activity.getAverageDailyCalories(user)
      
      expect(Math.round((Number(avgDailyCalories) + Number.EPSILON) * 100) / 100).toEqual(0)
    })
    
    
  })
  describe("Test getMaxCalories", () => {
    test("Return the correct max daily calories if user has nutritions", async () => {
      const user = { username: "jlo" }      
      const maxCalories = await Activity.getMaxCalories(user)
      
      expect(Number(maxCalories)).toEqual(565)
    })
    test("Return 0 if user doesn't have any nutritions", async () => {
      const user = { username: "lebron" }      
      const maxCalories = await Activity.getMaxCalories(user)
      
      expect(Number(maxCalories)).toEqual(0)
    })
    
    
  })
  describe("Test getAverageExerciseIntensity", () => {
    test("Return the correct average exercise intensity if user has exercises", async () => {
      const user = { username: "jlo" }      
      const avgExerciseIntensity = await Activity.getAverageExerciseIntensity(user)
      
      expect(Math.round((Number(avgExerciseIntensity) + Number.EPSILON) * 100) / 100).toEqual(5.5)
    })
    test("Return 0 if user doesn't have any exercises", async () => {
      const user = { username: "lebron" }      
      const avgExerciseIntensity = await Activity.getAverageExerciseIntensity(user)
      
      expect(Math.round((Number(avgExerciseIntensity) + Number.EPSILON) * 100) / 100).toEqual(0)
    })
    
    
  })
  describe("Test getTotalSleepHours", () => {
    test("Return the correct total sleep hours if user has sleeps", async () => {
      const user = { username: "jlo" }      
      const totalSleepHours = await Activity.getTotalSleepHours(user)
      
      expect(Number(totalSleepHours)).toEqual(17)
    })
    test("Return 0 if user doesn't have any sleeps", async () => {
      const user = { username: "lebron" }      
      const totalSleepHours = await Activity.getTotalSleepHours(user)
      
      expect(Number(totalSleepHours)).toEqual(0)
    })
    
    
  })
  describe("Test getSummaryStats", () => {
    test("Return the correct summary stats if user has activities", async () => {
      const user = { username: "jlo" } 
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
      const summaryStats = await Activity.getSummaryStats(user)
      summaryStats.exerciseSummaryStats.avgExerciseIntensity = Math.round((Number(summaryStats.exerciseSummaryStats.avgExerciseIntensity) + Number.EPSILON) * 100) / 100
      summaryStats.nutritionSummaryStats.avgDailyCalories = Math.round((Number(summaryStats.nutritionSummaryStats.avgDailyCalories) + Number.EPSILON) * 100) / 100
      summaryStats.sleepSummaryStats.avgSleepHours = Math.round((Number(summaryStats.sleepSummaryStats.avgSleepHours) + Number.EPSILON) * 100) / 100
      summaryStats.exerciseSummaryStats.totalExerciseMinutes = Number(summaryStats.exerciseSummaryStats.totalExerciseMinutes)
      summaryStats.nutritionSummaryStats.maxCalories = Number(summaryStats.nutritionSummaryStats.maxCalories)
      summaryStats.sleepSummaryStats.totalSleepHours = Number(summaryStats.sleepSummaryStats.totalSleepHours)
      expect(summaryStats).toEqual(testSummaryStats)
    })
    test("Return 0 for all fields if user doesn't have any activities", async () => {
      const user = { username: "lebron" } 
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
      const summaryStats = await Activity.getSummaryStats(user)
      summaryStats.exerciseSummaryStats.avgExerciseIntensity = Math.round((Number(summaryStats.exerciseSummaryStats.avgExerciseIntensity) + Number.EPSILON) * 100) / 100
      summaryStats.nutritionSummaryStats.avgDailyCalories = Math.round((Number(summaryStats.nutritionSummaryStats.avgDailyCalories) + Number.EPSILON) * 100) / 100
      summaryStats.sleepSummaryStats.avgSleepHours = Math.round((Number(summaryStats.sleepSummaryStats.avgSleepHours) + Number.EPSILON) * 100) / 100
      summaryStats.exerciseSummaryStats.totalExerciseMinutes = Number(summaryStats.exerciseSummaryStats.totalExerciseMinutes)
      summaryStats.nutritionSummaryStats.maxCalories = Number(summaryStats.nutritionSummaryStats.maxCalories)
      summaryStats.sleepSummaryStats.totalSleepHours = Number(summaryStats.sleepSummaryStats.totalSleepHours)
      expect(summaryStats).toEqual(testSummaryStats)
    })
    
  })
  
})