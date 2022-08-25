const request = require("supertest")
const app = require("../app")

const { commonBeforeAll, commonBeforeEach, commonAfterEach, commonAfterAll, testTokens } = require("../tests/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

/************************************** POST /auth/token */

describe("Auth Routes", () => {
  describe("POST /auth/login/", function () {
    test("User can login successfully with valid credentials", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "lebron@james.io",
        password: "password1",
      })
      expect(res.body).toEqual({
        token: expect.any(String),
        user: {
          id: expect.any(Number),
          username: "lebron",
          firstName: "LeBron",
          lastName: "James",
          email: "lebron@james.io",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          isAdmin: false,
        },
      })
    })

    test("Throws Unauthenticated error when user doesn't exist in db", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "somebody_else@users.io",
        password: "password",
      })
      expect(res.statusCode).toEqual(401)
    })

    test("Throws Unauthenticated error when user provides wrong password", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "lebron@james.io",
        password: "nope",
      })
      expect(res.statusCode).toEqual(401)
    })

    test("Throws Bad Request error when user doesn't provide password", async () => {
      const res = await request(app).post("/auth/login/").send({
        email: "lebron@james.io",
      })
      expect(res.statusCode).toEqual(400)
    })

    test("Throws Bad Request error when user doesn't provide email", async () => {
      const res = await request(app).post("/auth/login/").send({
        password: "password1",
      })
      expect(res.statusCode).toEqual(400)
    })
  })

  /************************************** POST /auth/register */
  describe("POST /auth/register/", () => {
    test("Allows user to register with valid credentials", async () => {
      const res = await request(app).post("/auth/register/").send({
        username: "new",
        firstName: "first",
        lastName: "last",
        password: "pw",
        email: "new@email.com",
      })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toEqual({
        token: expect.any(String),
        user: {
          id: expect.any(Number),
          username: "new",
          firstName: "first",
          lastName: "last",
          email: "new@email.com",
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          isAdmin: false,
        },
      })
    })

    test("Throws Bad Request error when user doesn't provide all fields", async () => {
      const res = await request(app).post("/auth/register/").send({
        username: "new",
      })
      expect(res.statusCode).toEqual(400)
    })
  })  

  /************************************** GET /auth/me */
  describe("GET /auth/me/", () => {
    test("User can access their profile", async () => {
      const res = await request(app).get("/auth/me/").set("authorization", `Bearer ${testTokens.jloToken}`)            
      const { user} = res.body
      
      expect(user).toEqual(      
       {
          id: expect.any(Number),
          username: "jlo",
          firstName: "Jennifer",
          lastName: "Lopez",          
          email: "jennifer@lopez.io",
          isAdmin: false,  
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
       }
      )
    })

    test("Throws Unauthorized error when user is unauthenticated", async () => {      
      const res = await request(app).get(`/auth/me/`)
      expect(res.statusCode).toEqual(401)
    })
  })

})