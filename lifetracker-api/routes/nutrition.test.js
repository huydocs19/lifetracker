const request = require("supertest")
const app = require("../app")

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testTokens,  
  testNutritionIds,
} = require("../tests/common")

beforeAll(commonBeforeAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)
afterAll(commonAfterAll)

const jloNutrition = {
  name: "Apple",
  category: "Fruit",
  quantity: 5,
  calories: 95,
  imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/199px-Red_Apple.jpg"
}

describe("POST /nutrition", () => {
  test("Authed user can create new nutrition successfully with valid params", async () => {
    const newNutrition = {
      name: "Pear",
      category: "Fruit",
      quantity: 2,
      calories: 30,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
    }

    const res = await request(app)
      .post(`/nutrition`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ nutrition: newNutrition })
    expect(res.statusCode).toEqual(201)

    const { nutrition } = res.body

    
    expect(nutrition).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "lebron",
      name: newNutrition.name,
      category:newNutrition.category,
      quantity: newNutrition.quantity,
      calories: newNutrition.calories,
      imageUrl: newNutrition.imageUrl,
      createdAt: expect.any(String)
    })
  })

  test("Can create new nutrition successfully when optional attributes aren't provided", async () => {
      
    let newNutrition = {
      name: "Pear",
      category: "Fruit",
      // quantity: 2,
      calories: 30,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
    }

    let res = await request(app)
      .post(`/nutrition`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ nutrition: newNutrition })
    expect(res.statusCode).toEqual(201)

    let nutrition = res.body.nutrition
  
    expect(nutrition).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "lebron",
      name: newNutrition.name,
      category:newNutrition.category,
      quantity: 1,
      calories: newNutrition.calories,
      imageUrl: newNutrition.imageUrl,
      createdAt: expect.any(String)
    })
    newNutrition = {
      name: "Pear",
      category: "Fruit",
      quantity: 2,
      // calories: 30,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
    }

    res = await request(app)
      .post(`/nutrition`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ nutrition: newNutrition })
    expect(res.statusCode).toEqual(201)

    nutrition = res.body.nutrition

    expect(nutrition).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "lebron",
      name: newNutrition.name,
      category:newNutrition.category,
      quantity: newNutrition.quantity,
      calories: 1,
      imageUrl: newNutrition.imageUrl,
      createdAt: expect.any(String)
    })
  })

  test("Throws an error when required attributes aren't provided", async () => {
      
    let newNutrition = {
      // name: "Pear",
      category: "Fruit",
      quantity: 2,
      calories: 30,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
    }

    let res = await request(app)
      .post(`/nutrition`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ nutrition: newNutrition })
    expect(res.statusCode).toEqual(400)

    newNutrition = {
      name: "Pear",
      // category: "Fruit",
      quantity: 2,
      calories: 30,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
    }

    res = await request(app)
      .post(`/nutrition`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ nutrition: newNutrition })
    expect(res.statusCode).toEqual(400)

    newNutrition = {
      name: "Pear",
      category: "Fruit",
      quantity: 2,
      calories: 30,
      // imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
    }

    res = await request(app)
      .post(`/nutrition`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ nutrition: newNutrition })
    expect(res.statusCode).toEqual(400)
  })

  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const res = await request(app).post(`/nutrition`)
    expect(res.statusCode).toEqual(401)
  })
})
describe("PUT /nutrition/:nutritionId/update", () => {
  test("Authed user can update existing nutrition successfully with valid params", async () => {
    const nutritionId = testNutritionIds[0]
    const updatedNutrition = {
      name: "Lettuce",
      category: "Vegetable",
      quantity: 10,
      calories: 5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
    }

    const res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(200)

    const {nutrition} = res.body
    
    expect(nutrition).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      name: updatedNutrition.name,
      category:updatedNutrition.category,
      quantity: updatedNutrition.quantity,
      calories: updatedNutrition.calories,
      imageUrl: updatedNutrition.imageUrl,
      createdAt: expect.any(String)
    })
  })
  test("Can update existing nutrition successfully when optional attributes aren't provided", async () => {
    const nutritionId = testNutritionIds[0]
    let updatedNutrition = {
      name: "Lettuce",
      category: "Vegetable",
      // quantity: 10,
      calories: 5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
    }

    let res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(200)

    let nutrition = res.body.nutrition

  
    expect(nutrition).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      name: updatedNutrition.name,
      category: updatedNutrition.category,
      quantity: 1,
      calories: updatedNutrition.calories,
      imageUrl: updatedNutrition.imageUrl,
      createdAt: expect.any(String)
    })
    updatedNutrition = {
      name: "Lettuce",
      category: "Vegetable",
      quantity: 10,
      // calories: 5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
    }

    res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(200)

    nutrition = res.body.nutrition

    expect(nutrition).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      name: updatedNutrition.name,
      category:updatedNutrition.category,
      quantity: updatedNutrition.quantity,
      calories: 1,
      imageUrl: updatedNutrition.imageUrl,
      createdAt: expect.any(String)
    })    
  })

  test("Throws an error when required attributes aren't provided", async () => {
    const nutritionId = testNutritionIds[0]
    let updatedNutrition = {
      // name: "Lettuce",
      category: "Vegetable",
      quantity: 10,
      calories: 5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
    }

    let res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(400)

    
    updatedNutrition = {
      name: "Lettuce",
      // category: "Vegetable",
      quantity: 10,
      calories: 5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
    }

    res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(400)
    
    updatedNutrition = {
      name: "Lettuce",
      category: "Vegetable",
      quantity: 10,
      calories: 5,
      // imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
    }

    res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(400)
    
    updatedNutrition = {
      name: "",
      category: "Vegetable",
      quantity: 10,
      calories: 5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
    }
    
    res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(400)

    updatedNutrition = {
      name: "Lettuce",
      category: "",
      quantity: 10,
      calories: 5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
    }
    
    res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(400)

    updatedNutrition = {
      name: "Lettuce",
      category: "Vegetable",
      quantity: 10,
      calories: 5,
      imageUrl: ""
    }
    
    res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(400)

  })
  test("Returns NotFoundError when id doesn't exist", async () => {      
    const nutritionId = -1000
    let updatedNutrition = {
      name: "Lettuce",
      category: "Vegetable",
      quantity: 10,
      calories: 5,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
    }
    res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(404)
    
  })

  test("Authenticated user who is not exercise owner receives 403 ForbiddenError", async () => {
    const nutritionId = testNutritionIds[0]
    let updatedNutrition = {
        name: "Lettuce",
        category: "Vegetable",
        quantity: 10,
        calories: 5,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
    }
    res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)
      .send({ nutrition: updatedNutrition })
    expect(res.statusCode).toEqual(403)
    })

  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const nutritionId = testNutritionIds[0]    
    res = await request(app)
      .put(`/nutrition/${nutritionId}/update`)   
    expect(res.statusCode).toEqual(401)
  })
})

describe("DELETE /nutrition/:nutritionId/delete", () => {
  test("Can delete existing nutrition by id", async () => {
    const nutritionId = testNutritionIds[0]

    const res = await request(app)
    .delete(`/nutrition/${nutritionId}/delete`)
    .set("authorization", `Bearer ${testTokens.jloToken}`)      
    expect(res.statusCode).toEqual(200)

    const {nutrition} = res.body

    expect(nutrition).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      name: jloNutrition.name,
      category: jloNutrition.category,
      quantity: jloNutrition.quantity,
      calories: jloNutrition.calories,
      imageUrl: jloNutrition.imageUrl,
      createdAt: expect.any(String)       
    })
  })

  test("Returns NotFoundError when id doesn't exist", async () => {      
    const res = await request(app)
      .delete(`/nutrition/-1000/delete`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)      
    expect(res.statusCode).toEqual(404)
    
  })

  test("Authenticated user who is not nutrition owner receives 403 ForbiddenError", async () => {
    const nutritionId = testNutritionIds[0]        
    const res = await request(app)
      .delete(`/nutrition/${nutritionId}/delete`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)        
    expect(res.statusCode).toEqual(403)
  })

  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const nutritionId = testNutritionIds[0]        
    const res = await request(app)
      .delete(`/nutrition/${nutritionId}/delete`)
    expect(res.statusCode).toEqual(401)
  })
})
describe("GET /nutrition", () => {
  test("Authed user can successfully fetch all nutritions", async () => {
    const res = await request(app)
      .get(`/nutrition`)
      .set("authorization", `Bearer ${testTokens.jloToken}`) 
      expect(res.statusCode).toEqual(200)
    const {nutritions} = res.body       
    expect(nutritions.length).toEqual(2)

    nutritions.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))  
    
    expect(nutritions).toEqual([
      {
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: "Apple",
        category: "Fruit",
        quantity: 5,
        calories: 95,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/199px-Red_Apple.jpg",
        createdAt: expect.any(String)
      },
      {
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: "Orange",
        category: "Fruit",
        quantity: 2,
        calories: 45,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/1200px-Oranges_-_whole-halved-segment.jpg",
        createdAt: expect.any(String)
      }        
    ]        
    )
  })
  test("Returns empty array when user doesn't have any nutritions", async () => {
      const res = await request(app)
        .get(`/nutrition`)
        .set("authorization", `Bearer ${testTokens.lebronToken}`) 
      expect(res.statusCode).toEqual(200)
      const {nutritions} = res.body  
      expect(nutritions.length).toEqual(0)        
    })
    test("Throws UnauthorizedError when user is unauthenticated", async () => {
      const res = await request(app)
        .get(`/nutrition`)  
      expect(res.statusCode).toEqual(401)
    })
})

describe("GET /:nutritionId", () => {
  test("Can fetch existing nutrition by id", async () => {
    const nutritionId = testNutritionIds[0]

    const res = await request(app)
      .get(`/nutrition/${nutritionId}`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)      
    expect(res.statusCode).toEqual(200)

    const {nutrition} = res.body

    expect(nutrition).toEqual({
      id: expect.any(Number),
      userId: expect.any(Number),
      username: "jlo",
      name: "Apple",
      category: "Fruit",
      quantity: 5,
      calories: 95,
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/199px-Red_Apple.jpg",
      createdAt: expect.any(String)         
    })
  })

  test("Throws NotFoundError when id doesn't exist", async () => {
    const nutritionId = -1000

    const res = await request(app)
      .get(`/nutrition/${nutritionId}`)
      .set("authorization", `Bearer ${testTokens.jloToken}`)      
    expect(res.statusCode).toEqual(404)
  })
  test("Authenticated user who is not nutrition owner receives 403 ForbiddenError", async () => {
    const nutritionId = testNutritionIds[0]        
    const res = await request(app)
      .get(`/nutrition/${nutritionId}`)
      .set("authorization", `Bearer ${testTokens.lebronToken}`)        
    expect(res.statusCode).toEqual(403)
  })
  test("Throws UnauthorizedError when user is unauthenticated", async () => {
    const nutritionId = testNutritionIds[0]
    const res = await request(app)
      .get(`/nutrition/${nutritionId}`) 
    expect(res.statusCode).toEqual(401)
  })
})