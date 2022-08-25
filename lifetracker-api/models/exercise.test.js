const { NotFoundError, BadRequestError} = require("../utils/errors")
const User = require("./user")
const Exercise = require("./exercise")
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testExerciseIds,
} = require("../tests/common")

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

describe("Exercise", () => {  
  describe("Test createExercise", () => {
    test("Can create new exercise successfully with valid params", async () => {
      const user = await User.login({ email: "lebron@james.io", password: "password1" })

      const newExercise = {
        name: "Lifting Weights",
        category: "Strength Training",
        duration: 60,
        intensity: 7
      }

      const exercise = await Exercise.createExercise({ newExercise, user })

      
      expect(exercise).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "lebron",
        name: newExercise.name,          
        category: newExercise.category,
        duration: 60,
        intensity: newExercise.intensity,
        createdAt: expect.any(Date)
      })
    })
    test("Can create new exercise successfully when optional attributes aren't provided", async () => {
      const user = await User.login({ email: "lebron@james.io", password: "password1" })

      let newExercise = {
        name: "Lifting Weights",
        category: "Strength Training",
        // duration: 60,
        intensity: 7
      }

      let exercise = await Exercise.createExercise({ newExercise, user })

    
      expect(exercise).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "lebron",
        name: newExercise.name,          
        category: newExercise.category,
        duration: 1,
        intensity: newExercise.intensity,
        createdAt: expect.any(Date)
      })

      newExercise = {
        name: "Lifting Weights",
        category: "Strength Training",
        duration: 60,
        // intensity: 7
      }
      exercise = await Exercise.createExercise({ newExercise, user })
    
      expect(exercise).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "lebron",
        name: newExercise.name,          
        category: newExercise.category,
        duration: newExercise.duration,
        intensity: 1,
        createdAt: expect.any(Date)
      })
    })

    test("Throws an error when required attributes aren't provided", async () => {
      expect.assertions(4)
      const user = await User.login({ email: "lebron@james.io", password: "password1" })

      let newExercise = {
        //  name: "Lifting Weights",
        category: "Strength Training",
        duration: 60,
        intensity: 7
      }

      try {
        await Exercise.createExercise({ newExercise, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }

      newExercise = {
          name: "Lifting Weights",
          //  category: "Strength Training",
          duration: 60,
          intensity: 7
      }

      try {
          await Exercise.createExercise({ newExercise, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }
      newExercise = {
        name: "",
        category: "Strength Training",
        duration: 60,
        intensity: 7
      }

      try {
          await Exercise.createExercise({ newExercise, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }


      newExercise = {
          name: "Lifting Weights",
          category: "",
          duration: 60,
          intensity: 7
      }

      try {
          await Exercise.createExercise({ newExercise, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }
    })
  })

  describe("Test updateExercise", () => {
    test("Can update existing exercise successfully with valid params", async () => {
      const exerciseId = testExerciseIds[0]
      const updatedExercise = {
        name: "Yoga",
        category: "Flexibility Training",
        duration: 100,
        intensity: 2
      }

      const exercise = await Exercise.updateExercise({ exerciseId, updatedExercise })

      
      expect(exercise).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: updatedExercise .name,          
        category: updatedExercise .category,
        duration: updatedExercise .duration,
        intensity: updatedExercise .intensity,
        createdAt: expect.any(Date)
      })
    })
    test("Can update existing exercise successfully when optional attributes aren't provided", async () => {
      const exerciseId = testExerciseIds[0]

      let updatedExercise = {
        name: "Yoga",
        category: "Flexibility Training",
        // duration: 100,
        intensity: 2
      }

      let exercise = await Exercise.updateExercise({ exerciseId, updatedExercise })

    
      expect(exercise).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: updatedExercise.name,          
        category: updatedExercise.category,
        duration: 1,
        intensity: updatedExercise.intensity,
        createdAt: expect.any(Date)
      })

      updatedExercise = {
        name: "Yoga",
        category: "Flexibility Training",
        duration: 100,
        // intensity: 2
      }

      exercise = await Exercise.updateExercise({ exerciseId, updatedExercise })

    
      expect(exercise).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: updatedExercise.name,          
        category: updatedExercise.category,
        duration: updatedExercise.duration,
        intensity: 1,
        createdAt: expect.any(Date)
      })
    })

    test("Throws an error when required attributes aren't provided", async () => {
      expect.assertions(4)  
      const exerciseId = testExerciseIds[0]
      let updatedExercise = {
        // name: "Yoga",
        category: "Flexibility Training",
        duration: 120,
        intensity: 2
      }

      try {
        await Exercise.updateExercise({ exerciseId, updatedExercise })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      updatedExercise = {
        name: "Yoga",
        // category: "Flexibility Training",
        duration: 120,
        intensity: 2
      }

      try {
        await Exercise.updateExercise({ exerciseId, updatedExercise })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      
      updatedExercise = {
        name: "",
        category: "Flexibility Training",
        duration: 120,
        intensity: 2
      }

      try {
        await Exercise.updateExercise({ exerciseId, updatedExercise })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      
      updatedExercise = {
        name: "Yoga",
        category: "",
        duration: 120,
        intensity: 2
      }

      try {
        await Exercise.updateExercise({ exerciseId, updatedExercise })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
    }
    })
    test("Throws NotFoundError when id doesn't exist", async () => {          
      expect.assertions(1)
      const exerciseId = -1000
      let updatedExercise = {
        name: "Yoga",
        category: "Flexibility Training",
        duration: 120,
        intensity: 2
      }

      try {
        await Exercise.updateExercise({ exerciseId, updatedExercise })
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy()
      }
      
    })
  })
  describe("Test deleteExercise", () => {
    test("Can delete existing exercise by id", async () => {
      const exerciseId = testExerciseIds[0]

      const exercise = await Exercise.deleteExercise(exerciseId)

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

    test("Throws NotFoundError when id doesn't exist", async () => { 
      expect.assertions(1)
      const exerciseId = -100         
      try {
        await await Exercise.deleteExercise(exerciseId) 
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy()
      }
      
    })
  })
  
  describe("Test listExercisesFromUser", () => {
    test("Can successfully fetch all exercises", async () => {
      const user = await User.login({ email: "jennifer@lopez.io", password: "password" })
      const exercises = await Exercise.listExercisesFromUser(user)
      expect(exercises.length).toEqual(2)

      exercises.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))  
      
      expect(exercises).toEqual([
        {
          id: expect.any(Number),
          userId: expect.any(Number),
          username: "jlo",
          name: "Dancing",
          category: "Aerobic Training",
          duration: 20,
          intensity: 6,
          createdAt: expect.any(Date)
        },
        {
          id: expect.any(Number),
          userId: expect.any(Number),
          username: "jlo",
          name: "Running",
          category: "Strength Training",
          duration: 30,
          intensity: 5,
          createdAt: expect.any(Date)
        }        
      ]        
      )
    })
    test("Returns empty array when user doesn't have any exercises", async () => {
        const user = await User.login({ email: "lebron@james.io", password: "password1" })
        const exercises = await Exercise.listExercisesFromUser(user)
        expect(exercises.length).toEqual(0)        
      })
  })
  
  describe("Test fetchExerciseById", () => {
    test("Can fetch exisitng exercise by id", async () => {
      const exerciseId = testExerciseIds[0]

      const exercise = await Exercise.fetchExerciseById(exerciseId)

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

    test("Throws NotFoundError when id doesn't exist", async () => {
      expect.assertions(1)
      const exerciseId = -1000
      try {
        await Exercise.fetchExerciseById(exerciseId)
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy()
      }
    })
  })
})