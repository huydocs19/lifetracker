const { NotFoundError, BadRequestError} = require("../utils/errors")
const User = require("./user")
const Sleep = require("./sleep")
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
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

describe("Sleep", () => {  
  describe("Test createSleep", () => {
    test("Can create new sleep successfully with valid params", async () => {
      const user = await User.login({ email: "lebron@james.io", password: "password1" })

      const newSleep = {
        startTime: "2022-08-22T23:00:00",
        endTime: "2022-08-23T09:00:00",
      }

      const sleep = await Sleep.createSleep({ newSleep, user })
      
      expect(sleep).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "lebron",        
        startTime: new Date(newSleep.startTime),
        endTime: new Date(newSleep.endTime),
        createdAt: expect.any(Date)
      })
    })

    test("Throws an error when required attributes aren't valid", async () => {
      expect.assertions(8)
      const user = await User.login({ email: "jennifer@lopez.io", password: "password" })

      let newSleep = {
        startTime: "2022-08-23T22:00:00",
        endTime: "2022-08-23T21:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      newSleep = {
        startTime: "2022-08-22T22:00:00",
         endTime: "2022-08-23T00:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }

      newSleep = {
        startTime: "2022-08-23T09:00:00",
        endTime: "2022-08-23T10:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      newSleep = {
        startTime: "2022-08-22T22:00:00",
        endTime: "2022-08-23T01:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      newSleep = {
        startTime: "2022-08-23T08:00:00",
        endTime: "2022-08-23T10:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      newSleep = {
        startTime: "2022-08-23T00:00:00",
        endTime: "2022-08-23T09:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      newSleep = {
        startTime: "2022-08-23T00:00:00",
        endTime: "2022-08-23T10:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      newSleep = {
        startTime: "2022-08-22T22:00:00",
        endTime: "2022-08-23T09:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
    })

    test("Throws an error when required attributes aren't provided", async () => {
      expect.assertions(6)
      const user = await User.login({ email: "lebron@james.io", password: "password1" })

      newSleep = {
        // startTime: "2022-08-22T23:00:00",
         endTime: "2022-08-23T09:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      newSleep = {
        startTime: "2022-08-22T23:00:00",
        // endTime: "2022-08-23T09:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
      newSleep = {
        startTime: "",
        endTime: "2022-08-23T09:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }

      newSleep = {
        startTime: "2022-08-22T23:00:00",
        endTime: "",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }

      newSleep = {
        startTime: "invalid start time",
        endTime: "2022-08-23T09:00:00",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }

      newSleep = {
        startTime: "2022-08-22T23:00:00",
        endTime: "invalid end time",
      }

      try {
        await Sleep.createSleep({ newSleep, user })
      } catch (err) {
        expect(err instanceof BadRequestError).toBeTruthy()
      }
    })
  })  

  describe("Test updateSleep", () => {
    test("Can update existing sleep successfully with valid params", async () => {        
      const user = await User.login({ email: "jennifer@lopez.io", password: "password" })
      const sleepId = testSleepIds[0]
      let updatedSleep = {
        startTime: "2022-08-21T01:00:00",
        endTime: "2022-08-21T07:00:00",
      }

      let sleep = await Sleep.updateSleep({ sleepId, updatedSleep, user })
  
        
      expect(sleep).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",        
        startTime: new Date(updatedSleep.startTime),
        endTime: new Date(updatedSleep.endTime),
        createdAt: expect.any(Date)
      })

      updatedSleep = {
          startTime: "2022-08-22T22:00:00",
          endTime: "2022-08-23T09:00:00",
      }
    
      sleep = await Sleep.updateSleep({ sleepId, updatedSleep, user })

        
      expect(sleep).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",        
        startTime: new Date(updatedSleep.startTime),
        endTime: new Date(updatedSleep.endTime),
        createdAt: expect.any(Date)
      })
    })
  
    test("Throws an error when required attributes aren't valid", async () => {
      expect.assertions(8)
      const user = await User.login({ email: "jennifer@lopez.io", password: "password" })
      const sleepId = testSleepIds[1]
      let updatedSleep = {
          startTime: "2022-08-23T22:00:00",
          endTime: "2022-08-23T21:00:00",
      }

      try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }
      updatedSleep = {
          startTime: "2022-08-22T22:00:00",
          endTime: "2022-08-23T00:00:00",
      }

      try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }

      updatedSleep = {
          startTime: "2022-08-23T09:00:00",
          endTime: "2022-08-23T10:00:00",
      }

      try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }
      updatedSleep = {
          startTime: "2022-08-22T22:00:00",
          endTime: "2022-08-23T01:00:00",
      }

      try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }
      updatedSleep = {
          startTime: "2022-08-23T08:00:00",
          endTime: "2022-08-23T10:00:00",
      }

      try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }
      updatedSleep = {
          startTime: "2022-08-23T00:00:00",
          endTime: "2022-08-23T09:00:00",
      }

      try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }
      updatedSleep = {
          startTime: "2022-08-23T00:00:00",
          endTime: "2022-08-23T10:00:00",
      }

      try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }
      updatedSleep = {
          startTime: "2022-08-22T22:00:00",
          endTime: "2022-08-23T09:00:00",
      }

      try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }
    })
  
    test("Throws an error when required attributes aren't provided", async () => {
      expect.assertions(6)
      const user = await User.login({ email: "jennifer@lopez.io", password: "password" })
      const sleepId = testSleepIds[0]
        updatedSleep = {
          // startTime: "2022-08-21T01:00:00",
          endTime: "2022-08-21T07:00:00",
        }

        try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
        updatedSleep = {
          startTime: "2022-08-21T01:00:00",
          // endTime: "2022-08-21T07:00:00",
        }

        try {
            await Sleep.updateSleep({ sleepId, updatedSleep, user })
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
        updatedSleep = {
          startTime: "",
          endTime: "2022-08-21T07:00:00",
        }

        try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }

        updatedSleep = {
          startTime: "2022-08-21T01:00:00",
          endTime: "",
        }

        try {
            await Sleep.updateSleep({ sleepId, updatedSleep, user })
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }

        updatedSleep = {
            startTime: "invalid start time",              
            endTime: "2022-08-21T07:00:00",
        }

        try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user })
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }

        updatedSleep = {
          startTime: "2022-08-21T01:00:00",
          endTime: "invalid end time",
        }

        try {
          await Sleep.updateSleep({ sleepId, updatedSleep, user})
        } catch (err) {
            expect(err instanceof BadRequestError).toBeTruthy()
        }
    })
    test("Raises NotFoundError when id doesn't exist", async () => {
      expect.assertions(1)
      const user = await User.login({ email: "jennifer@lopez.io", password: "password" })
      const sleepId = -1000
      const updatedSleep = {
        startTime: "2022-08-21T01:00:00",
        endTime: "2022-08-21T07:00:00",
      }
      try {
        await Sleep.updateSleep({ sleepId, updatedSleep, user})
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy()
      }
      
    })
  })
  describe("Test deleteSleep", () => {
    test("Can delete existing sleep by id", async () => {
      const sleepId = testSleepIds[0]

      const sleep = await Sleep.deleteSleep(sleepId)

      expect(sleep).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",        
        startTime: jloSleep.startTime,
        endTime: jloSleep.endTime,
        createdAt: expect.any(Date)      
      })
    })

    test("Raises NotFoundError when id doesn't exist", async () => {
      expect.assertions(1)
      const sleepId = -1000
      try {
        await Sleep.deleteSleep(sleepId)
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy()
      }
      
    })
  })
  
  describe("Test listSleepsFromUser", () => {
    test("Can successfully fetch all sleeps", async () => {
      const user = await User.login({ email: "jennifer@lopez.io", password: "password" })
      const sleeps = await Sleep.listSleepsFromUser(user)
      expect(sleeps.length).toEqual(2)

      sleeps.sort((a,b) => (a.startTime > b.startTime) ? 1 : ((b.startTime > a.startTime) ? -1 : 0))  
      
      expect(sleeps).toEqual([
        {
          id: expect.any(Number),
          userId: expect.any(Number),
          username: "jlo",
          startTime: new Date("2022-08-22T00:00:00"),
          endTime: new Date("2022-08-22T08:00:00"),
          createdAt: expect.any(Date)
        },
        {
          id: expect.any(Number),
          userId: expect.any(Number),
          username: "jlo",
          startTime: new Date("2022-08-23T00:00:00"),
          endTime: new Date("2022-08-23T09:00:00"),
          createdAt: expect.any(Date)
        }        
      ]        
      )
    })
    test("Returns empty array when user doesn't have any sleeps", async () => {
        const user = await User.login({ email: "lebron@james.io", password: "password1" })
        const sleeps = await Sleep.listSleepsFromUser(user)
        expect(sleeps.length).toEqual(0)        
      })
  })
  
  describe("Test fetchSleepById", () => {
    test("Can fetch existing sleep by id", async () => {
      const sleepId = testSleepIds[0]

      const sleep = await Sleep.fetchSleepById(sleepId)

      expect(sleep).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        startTime: jloSleep.startTime,
        endTime: jloSleep.endTime,
        createdAt: expect.any(Date)        
      })
    })

    test("Throws NotFoundError when id doesn't exist", async () => {
      expect.assertions(1)
      const sleepId = -1000
      try {
        await Sleep.fetchSleepById(sleepId)
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy()
      }
    })
  })
})