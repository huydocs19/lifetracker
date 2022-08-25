const request = require("supertest")
const app = require("../app")

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,  
  testSleepIds,
} = require("../tests/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

const jloSleep = {
  startTime: new Date("2022-08-23T00:00:00"),
  endTime: new Date("2022-08-23T09:00:00"),
}

describe("POST /sleep", () => {
  test("Authed user can create new sleep successfully with valid params", async () => {
    
    const newSleep = {
      startTime: "2022-08-22T23:00:00",
      endTime: "2022-08-23T09:00:00",
    }

    const res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(201)

    const { sleep } = res.body

    
    expect(sleep).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "lebron",        
      startTime: (new Date(newSleep.startTime)).toISOString(),
      endTime: (new Date(newSleep.endTime)).toISOString(),
      createdAt: expect.any(String)
    })
  })

  test("Throws an error when required attributes aren't valid", async () => {
      
    let newSleep = {
      startTime: "2022-08-23T22:00:00",
      endTime: "2022-08-23T21:00:00",
    }

    let res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "2022-08-22T22:00:00",
      endTime: "2022-08-23T00:00:00",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "2022-08-23T09:00:00",
      endTime: "2022-08-23T10:00:00",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "2022-08-22T22:00:00",
      endTime: "2022-08-23T01:00:00",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "2022-08-23T08:00:00",
      endTime: "2022-08-23T10:00:00",
    }

    res = await request(app)
    .post(`/sleep`)
    .set("authorization", `Bearer ${testTokens.jloToken}`)
    .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "2022-08-23T00:00:00",
      endTime: "2022-08-23T09:00:00",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "2022-08-23T00:00:00",
      endTime: "2022-08-23T10:00:00",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "2022-08-22T22:00:00",
      endTime: "2022-08-23T09:00:00",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: newSleep })    
    expect(res.statusCode).toEqual(400)
  })

  test("Throws an error when required attributes aren't provided", async () => {
    newSleep = {
      // startTime: "2022-08-22T23:00:00",
      endTime: "2022-08-23T09:00:00",
    }

    let res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "2022-08-22T23:00:00",
      // endTime: "2022-08-23T09:00:00",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "",
      endTime: "2022-08-23T09:00:00",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "2022-08-22T23:00:00",
      endTime: "",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "invalid start time",
      endTime: "2022-08-23T09:00:00",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)

    newSleep = {
      startTime: "2022-08-22T23:00:00",
      endTime: "invalid end time",
    }

    res = await request(app)
      .post(`/sleep`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ sleep: newSleep })
    expect(res.statusCode).toEqual(400)
  })

  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const res = await request(app).post(`/sleep`)
    expect(res.statusCode).toEqual(401)
})
}) 
  
describe("PUT /sleep/:sleepId/update", () => {
  test("Authed user can update existing sleep successfully with valid params", async () => {        
      
    const sleepId = testSleepIds[0]
    let updatedSleep = {
      startTime: "2022-08-21T01:00:00",
      endTime: "2022-08-21T07:00:00",
    }

    let res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(200)
    
    let sleep = res.body.sleep
    
    expect(sleep).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",        
      startTime: (new Date(updatedSleep.startTime)).toISOString(),
      endTime: (new Date(updatedSleep.endTime)).toISOString(),
      createdAt: expect.any(String)
    })

    updatedSleep = {
      startTime: "2022-08-22T22:00:00",
      endTime: "2022-08-23T09:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(200)

    sleep = res.body.sleep
    expect(sleep).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",        
      startTime: (new Date(updatedSleep.startTime)).toISOString(),
      endTime: (new Date(updatedSleep.endTime)).toISOString(),
      createdAt: expect.any(String)
    })
  })

  test("Throws an error when required attributes aren't valid", async () => {
    
    const sleepId = testSleepIds[1]
    let updatedSleep = {
      startTime: "2022-08-23T22:00:00",
      endTime: "2022-08-23T21:00:00",
    }

    let res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "2022-08-22T22:00:00",
      endTime: "2022-08-23T00:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "2022-08-23T09:00:00",
      endTime: "2022-08-23T10:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "2022-08-22T22:00:00",
      endTime: "2022-08-23T01:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "2022-08-23T08:00:00",
      endTime: "2022-08-23T10:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "2022-08-23T00:00:00",
      endTime: "2022-08-23T09:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "2022-08-23T00:00:00",
      endTime: "2022-08-23T10:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "2022-08-22T22:00:00",
      endTime: "2022-08-23T09:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)
  })

  test("Throws an error when required attributes aren't provided", async () => {
    const sleepId = testSleepIds[0]
      updatedSleep = {
        // startTime: "2022-08-21T01:00:00",
        endTime: "2022-08-21T07:00:00",
      }

    let res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "2022-08-21T01:00:00",
      // endTime: "2022-08-21T07:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "",
      endTime: "2022-08-21T07:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "2022-08-21T01:00:00",
      endTime: "",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
        startTime: "invalid start time",              
        endTime: "2022-08-21T07:00:00",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)

    updatedSleep = {
      startTime: "2022-08-21T01:00:00",
      endTime: "invalid end time",
    }

    res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(400)
  })
  test("Raises NotFoundError when id doesn't exist", async () => {
    const sleepId = -1000
    const updatedSleep = {
        startTime: "2022-08-21T01:00:00",
        endTime: "2022-08-21T07:00:00",
    }
    const res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(404)
  
  })
  test("Authenticated user who is not exercise owner receives 403 ForbiddenError", async () => {
    const sleepId = testSleepIds[0]
    const updatedSleep = {
        startTime: "2022-08-21T01:00:00",
        endTime: "2022-08-21T07:00:00",
    }
    const res = await request(app)
      .put(`/sleep/${sleepId}/update`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ sleep: updatedSleep })
    expect(res.statusCode).toEqual(403)
  })

  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const sleepId = testSleepIds[0]
    const res = await request(app)
      .put(`/sleep/${sleepId}/update`)
    expect(res.statusCode).toEqual(401)
  })
})

describe("DELETE /sleep/:sleepId/delete", () => {
  test("Can delete existing sleep by id", async () => {
    const sleepId = testSleepIds[0]

    const res = await request(app)
      .delete(`/sleep/${sleepId}/delete`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)        
      expect(res.statusCode).toEqual(200)

    const {sleep} = res.body

    expect(sleep).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",        
      startTime: jloSleep.startTime.toISOString(),
      endTime: jloSleep.endTime.toISOString(),
      createdAt: expect.any(String)      
    })
  })

  test("Raises NotFoundError when id doesn't exist", async () => {
      const sleepId = -1000       
      const res = await request(app)
        .delete(`/sleep/${sleepId}/delete`)
        .set("authorization", `Bearer ${testTokens.jloToken}`)        
      expect(res.statusCode).toEqual(404)
    
  })
  test("Authenticated user who is not sleep owner receives 403 ForbiddenError", async () => {
    const sleepId = testSleepIds[0]        
    const res = await request(app)
      .delete(`/sleep/${sleepId}/delete`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)        
    expect(res.statusCode).toEqual(403)
  })

  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const sleepId = testSleepIds[0]
    const res = await request(app)
      .delete(`/sleep/${sleepId}/delete`)
    expect(res.statusCode).toEqual(401)
  })
})

describe("GET /sleep", () => {
  test("Can successfully fetch all sleeps", async () => {
    const res = await request(app)
      .get(`/sleep`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)  
    expect(res.statusCode).toEqual(200)
    const {sleeps} = res.body
    expect(sleeps.length).toEqual(2)

    sleeps.sort((a,b) => (a.startTime > b.startTime) ? 1 : ((b.startTime > a.startTime) ? -1 : 0))  
    
    expect(sleeps).toEqual([
      {
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        startTime: (new Date("2022-08-22T00:00:00")).toISOString(),
        endTime: (new Date("2022-08-22T08:00:00")).toISOString(),
        createdAt: expect.any(String)
      },
      {
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        startTime: (new Date("2022-08-23T00:00:00")).toISOString(),
        endTime: (new Date("2022-08-23T09:00:00")).toISOString(),
        createdAt: expect.any(String)
      }        
    ]        
    )
  })
  test("Returns empty array when user doesn't have any sleeps", async () => {
    const res = await request(app)
      .get(`/sleep`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)  
    expect(res.statusCode).toEqual(200)
    const {sleeps} = res.body
    expect(sleeps.length).toEqual(0)        
  })     

  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const res = await request(app)
      .get(`/sleep`)
    expect(res.statusCode).toEqual(401)
  })
})  
describe("GET /sleep/:sleepId", () => {
  test("Can fetch existing sleep by id", async () => {
    const sleepId = testSleepIds[0]

    const res = await request(app)
      .get(`/sleep/${sleepId}`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)  

    expect(res.statusCode).toEqual(200)
    const {sleep} = res.body

    expect(sleep).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      startTime: jloSleep.startTime.toISOString(),
      endTime: jloSleep.endTime.toISOString(),
      createdAt: expect.any(String)        
    })
  })

  test("Throws NotFoundError when id doesn't exist", async () => {
    const sleepId = -1000
    const res = await request(app)
      .get(`/sleep/${sleepId}`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)  

    expect(res.statusCode).toEqual(404)
  })
  test("Authenticated user who is not sleep owner receives 403 ForbiddenError", async () => {
    const sleepId = testSleepIds[0]        
    const res = await request(app)
      .get(`/sleep/${sleepId}`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)        
    expect(res.statusCode).toEqual(403)
  })

  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const sleepId = testSleepIds[0]
    const res = await request(app)
      .get(`/sleep/${sleepId}`)
    expect(res.statusCode).toEqual(401)
  })
})
