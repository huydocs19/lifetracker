const request = require("supertest")
const app = require("../app")

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,
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


describe("POST /exercise", () => {
  test("Authed user can create new exercise successfully with valid params", async () => {
    const newExercise = {
      name: "Lifting Weights",
      category: "Strength Training",
      duration: 60,
      intensity: 7
    }

    const res = await request(app)
      .post(`/exercise`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ exercise: newExercise })
    expect(res.statusCode).toEqual(201)

    const {exercise} = res.body
    expect(exercise).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "lebron",
      name: newExercise.name,          
      category: newExercise.category,
      duration: 60,
      intensity: newExercise.intensity,
      createdAt: expect.any(String)
    })
  })
  test("Authed user can create new exercise successfully when optional attributes aren't provided", async () => {
    let newExercise = {
      name: "Lifting Weights",
      category: "Strength Training",
      // duration: 60,
      intensity: 7
    }

    let res = await request(app)
      .post(`/exercise`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ exercise: newExercise })
    expect(res.statusCode).toEqual(201)
    let exercise = res.body.exercise
    
    expect(exercise).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "lebron",
      name: newExercise.name,          
      category: newExercise.category,
      duration: 1,
      intensity: newExercise.intensity,
      createdAt: expect.any(String)
    })

    newExercise = {
      name: "Lifting Weights",
      category: "Strength Training",
      duration: 60,
      // intensity: 7
    }
    res = await request(app)
      .post(`/exercise`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ exercise: newExercise })
    expect(res.statusCode).toEqual(201)

    exercise = res.body.exercise    
    expect(exercise).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "lebron",
      name: newExercise.name,          
      category: newExercise.category,
      duration: newExercise.duration,
      intensity: 1,
      createdAt: expect.any(String)
    })
  })

  test("Throws an error when required attributes aren't provided", async () => {
      
    let newExercise = {
      //  name: "Lifting Weights",
      category: "Strength Training",
      duration: 60,
      intensity: 7
    }

    let res = await request(app)
      .post(`/exercise`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ exercise: newExercise })
    expect(res.statusCode).toEqual(400)
    
    newExercise = {
      name: "Lifting Weights",
      //  category: "Strength Training",
      duration: 60,
      intensity: 7
    }

    res = await request(app)
      .post(`/exercise`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ exercise: newExercise })
    expect(res.statusCode).toEqual(400)

    newExercise = {
      name: "",
      category: "Strength Training",
      duration: 60,
      intensity: 7
    }

    res = await request(app)
      .post(`/exercise`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ exercise: newExercise })
    expect(res.statusCode).toEqual(400)

    newExercise = {
      name: "Lifting Weights",
      category: "",
      duration: 60,
      intensity: 7
    }

    res = await request(app)
      .post(`/exercise`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ exercise: newExercise })
    expect(res.statusCode).toEqual(400)
  })

  test("Throws UnauthorizeError when user is unauthenticated", async () => {
    const res = await request(app).post(`/exercise`)
    expect(res.statusCode).toEqual(401)
  })
})
describe("PUT /exercise/:exerciseId/update", () => {
  test("Authed user can update existing exercise successfully with valid params", async () => {
    const exerciseId = testExerciseIds[0]
    const updatedExercise = {
      name: "Yoga",
      category: "Flexibility Training",
      duration: 100,
      intensity: 2
    }

    const res = await request(app)
      .put(`/exercise/${exerciseId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ exercise: updatedExercise })
      expect(res.statusCode).toEqual(200)
    const {exercise} = res.body
    
    expect(exercise).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      name: updatedExercise .name,          
      category: updatedExercise .category,
      duration: updatedExercise .duration,
      intensity: updatedExercise .intensity,
      createdAt: expect.any(String)
    })
  })
  test("Authed user can update existing exercise successfully when optional attributes aren't provided", async () => {
    const exerciseId = testExerciseIds[0]

    let updatedExercise = {
      name: "Yoga",
      category: "Flexibility Training",
      // duration: 100,
      intensity: 2
    }

    let res = await request(app)
      .put(`/exercise/${exerciseId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ exercise: updatedExercise })
    expect(res.statusCode).toEqual(200)
    let exercise = res.body.exercise
  
    expect(exercise).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      name: updatedExercise.name,          
      category: updatedExercise.category,
      duration: 1,
      intensity: updatedExercise.intensity,
      createdAt: expect.any(String)
    })

    updatedExercise = {
      name: "Yoga",
      category: "Flexibility Training",
      duration: 100,
      // intensity: 2
    }

    res = await request(app)
      .put(`/exercise/${exerciseId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ exercise: updatedExercise })
    expect(res.statusCode).toEqual(200)
    exercise = res.body.exercise
  
    expect(exercise).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      name: updatedExercise.name,          
      category: updatedExercise.category,
      duration: updatedExercise.duration,
      intensity: 1,
      createdAt: expect.any(String)
    })
  })

  test("Throws an error when required attributes aren't provided", async () => {
    const exerciseId = testExerciseIds[0]
    let updatedExercise = {
      // name: "Yoga",
      category: "Flexibility Training",
      duration: 120,
      intensity: 2
    }

    let res = await request(app)
      .put(`/exercise/${exerciseId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ exercise: updatedExercise })        
    expect(res.statusCode).toEqual(400)

    updatedExercise = {
      name: "Yoga",
      // category: "Flexibility Training",
      duration: 120,
      intensity: 2
    }

    res = await request(app)
      .put(`/exercise/${exerciseId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ exercise: updatedExercise })        
    expect(res.statusCode).toEqual(400)
    
    updatedExercise = {
      name: "",
      category: "Flexibility Training",
      duration: 120,
      intensity: 2
    }

    res = await request(app)
      .put(`/exercise/${exerciseId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ exercise: updatedExercise })        
    expect(res.statusCode).toEqual(400)
    
    updatedExercise = {
      name: "Yoga",
      category: "",
      duration: 120,
      intensity: 2
    }

    res = await request(app)
      .put(`/exercise/${exerciseId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ exercise: updatedExercise })        
    expect(res.statusCode).toEqual(400)
  })

  test("Throws NotFoundError when id doesn't exist", async () => {
    const exerciseId = -1000
    const updatedExercise = {
      name: "Yoga",
      category: "",
      duration: 120,
      intensity: 2
    }
    const res = await request(app)
      .put(`/exercise/${exerciseId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ exercise: updatedExercise })        
    expect(res.statusCode).toEqual(404)     
  }) 
  
  test("Authenticated user who is not exercise owner receives 403 ForbiddenError", async () => {
    const exerciseId = testExerciseIds[0]
    let updatedExercise = {
      name: "Yoga",
      category: "Flexibility Training",
      duration: 120,
      intensity: 2
    }
    res = await request(app)
      .put(`/exercise/${exerciseId}/update`) 
      .set("authorization", `Bearer ${testTokens.lebronToken}`)       
      .send({ exercise: updatedExercise }) 
    expect(res.statusCode).toEqual(403)
  })

  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const exerciseId = testExerciseIds[0]
    res = await request(app)
      .put(`/exercise/${exerciseId}/update`) 
    expect(res.statusCode).toEqual(401)
  })
})
describe("DELETE /:exerciseId/delete", () => {
  test("Authed user can delete existing exercise by id", async () => {
    const exerciseId = testExerciseIds[0]

    const res = await request(app)
      .delete(`/exercise/${exerciseId}/delete`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)           
    expect(res.statusCode).toEqual(200)

    const {exercise} = res.body

    expect(exercise).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      name: jloExercise.name,          
      category: jloExercise.category,
      duration: jloExercise.duration,
      intensity: jloExercise.intensity,
      createdAt: expect.any(String)         
    })
  })

  test("Throws NotFoundError when id doesn't exist", async () => {
    const res = await request(app)
      .delete(`/exercise/-1000/delete`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)           
    expect(res.statusCode).toEqual(404)       
  }) 

  test("Authenticated user who is not exercise owner receives 403 ForbiddenError", async () => {
    const exerciseId = testExerciseIds[0]     
    res = await request(app)
      .delete(`/exercise/${exerciseId}/delete`) 
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
    expect(res.statusCode).toEqual(403)
  })

  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const exerciseId = testExerciseIds[0]
    res = await request(app)
      .delete(`/exercise/${exerciseId}/delete`) 
    expect(res.statusCode).toEqual(401)
  })
})

describe("GET /exercise", () => {
  test("Authed user can successfully fetch all exercises", async () => {
    const res = await request(app)
      .get(`/exercise`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)           
    expect(res.statusCode).toEqual(200)
    const {exercises} = res.body
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
        createdAt: expect.any(String)
      },
      {
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: "Running",
        category: "Strength Training",
        duration: 30,
        intensity: 5,
        createdAt: expect.any(String)
      }        
    ]        
    )
  })
  test("Returns empty array when user doesn't have any exercises", async () => {
    const res = await request(app)
      .get(`/exercise`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)           
    expect(res.statusCode).toEqual(200)
    const {exercises} = res.body
    expect(exercises.length).toEqual(0)        
    })
  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const res = await request(app)
      .get(`/exercise`)        
    expect(res.statusCode).toEqual(401)
  })
})
describe("GET /exercise/:exerciseId", () => {
  test("Authed user can fetch exercise by id", async () => {
    const exerciseId = testExerciseIds[0]

    const res = await request(app)
      .get(`/exercise/${exerciseId}`)
      .set("authorization", `Bearer ${testTokens.jloToken}`) 
    expect(res.statusCode).toEqual(200)
    const {exercise} = res.body
    expect(exercise).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      name: jloExercise.name,          
      category: jloExercise.category,
      duration: jloExercise.duration,
      intensity: jloExercise.intensity,
      createdAt: expect.any(String)         
    })
  })

  test("Throws NotFoundError when id doesn't exist", async () => {
    const exerciseId = -1000

    const res = await request(app)
      .get(`/exercise/${exerciseId}`)
      .set("authorization", `Bearer ${testTokens.jloToken}`) 
    expect(res.statusCode).toEqual(404)
    
  })  
  test("Authenticated user who is not exercise owner receives 403 ForbiddenError", async () => {
    const exerciseId = testExerciseIds[0]     
    res = await request(app)
      .get(`/exercise/${exerciseId}`) 
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
    expect(res.statusCode).toEqual(403)
  })
  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const exerciseId = testExerciseIds[0]
    const res = await request(app)
      .get(`/exercise/${exerciseId}`)        
    expect(res.statusCode).toEqual(401)
  })
})

