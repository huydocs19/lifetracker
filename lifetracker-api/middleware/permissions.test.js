const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testExerciseIds,
  testNutritionIds,
  testSleepIds
} = require("../tests/common")
const {ForbiddenError } = require("../utils/errors")
const permissions = require("./permissions")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

const jloExercise = {
  name: "Running",
  category: "Strength Training",
  duration: 30,
  intensity: 5
}
const jloNutrition = {
  name: "Apple",
  category: "Fruit",
  quantity: 5,
  calories: 95,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/199px-Red_Apple.jpg"
}
const jloSleep = {
  startTime: new Date("2022-08-23T00:00:00"),
  endTime: new Date("2022-08-23T09:00:00"),
}

describe("Permissions", () => {
  describe("Test authedUserIsExerciseOwner", () => {
    test("Attaches exercise to res.local if authed user is exercise owner", async () => {
      expect.assertions(3)
      const testExercise = testExerciseIds[0]

      const req = { params: { exerciseId: testExercise } }
      const res = { locals: { user: { username: "jlo" } } }
      const next = (err) => expect(err).toBeFalsy()
      await permissions.authedUserIsExerciseOwner(req, res, next)

      const { exercise } = res.locals
      expect(exercise).toBeTruthy()  
      
      expect(exercise).toEqual({
          id: expect.any(Number),
          userId: expect.any(Number),
          username: "jlo",
          name: jloExercise.name,          
          category: jloExercise.category,
          duration: jloExercise.duration,
          intensity: jloExercise.intensity,
          createdAt: expect.any(Date)         
      })
    })

    test("Throws error if authed user doesn't own exercise", async () => {
      expect.assertions(2)
      const testExercise = testExerciseIds[0]

      const req = { params: { exerciseId: testExercise } }
      const res = { locals: { user: { username: "lebron" } } }
      const next = (err) => expect(err instanceof ForbiddenError).toBeTruthy()
      await permissions.authedUserIsExerciseOwner(req, res, next)

      const { exercise } = res.locals
      expect(exercise).toBeFalsy()
    })
  })  
  describe("Test authedUserIsNutritionOwner", () => {
      test("Attaches nutrition to res.local if authed user is nutrition owner", async () => {
        expect.assertions(3)
        const testNutrition = testNutritionIds[0]
  
        const req = { params: { nutritionId: testNutrition} }
        const res = { locals: { user: { username: "jlo" } } }
        const next = (err) => expect(err).toBeFalsy()
        await permissions.authedUserIsNutritionOwner(req, res, next)
  
        const { nutrition } = res.locals
        expect(nutrition).toBeTruthy()  
        
        expect(nutrition).toEqual({
          id: expect.any(Number),
          userId: expect.any(Number),
          username: "jlo",
          name: jloNutrition.name,
          category:jloNutrition.category,
          quantity: jloNutrition.quantity,
          calories: jloNutrition.calories,
          imageUrl: jloNutrition.imageUrl,
          createdAt: expect.any(Date)
        })
      })
  
      test("Throws error if authed user doesn't own nutrition", async () => {
        expect.assertions(2)
        const testNutrition = testNutritionIds[0]
  
        const req = { params: { nutritionId: testNutrition } }
        const res = { locals: { user: { username: "lebron" } } }
        const next = (err) => expect(err instanceof ForbiddenError).toBeTruthy()
        await permissions.authedUserIsNutritionOwner(req, res, next)
  
        const { nutrition } = res.locals
        expect(nutrition).toBeFalsy()
      })
    })  
    describe("Test authedUserIsSleepOwner", () => {
      test("Attaches sleep to res.local if authed user is sleep owner", async () => {
        expect.assertions(3)
        const testSleep = testSleepIds[0]
  
        const req = { params: { sleepId: testSleep} }
        const res = { locals: { user: { username: "jlo" } } }
        const next = (err) => expect(err).toBeFalsy()
        await permissions.authedUserIsSleepOwner(req, res, next)
  
        const { sleep } = res.locals
        expect(sleep).toBeTruthy()  
        
        expect(sleep).toEqual({
          id: expect.any(Number),
          userId: expect.any(Number),
          username: "jlo",
          startTime: jloSleep.startTime,
          endTime: jloSleep.endTime,
          createdAt: expect.any(Date)
        })
      })
  
      test("Throws error if authed user doesn't own sleep", async () => {
        expect.assertions(2)
        const testSleep = testSleepIds[0]
  
        const req = { params: { sleepId: testSleep } }
        const res = { locals: { user: { username: "lebron" } } }
        const next = (err) => expect(err instanceof ForbiddenError).toBeTruthy()
        await permissions.authedUserIsSleepOwner(req, res, next)
  
        const { sleep } = res.locals
        expect(sleep).toBeFalsy()
      })
    }) 
  
})