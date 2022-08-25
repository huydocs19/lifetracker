const { NotFoundError, BadRequestError} = require("../utils/errors")
const User = require("./user")
const Nutrition = require("./nutrition")
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
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

describe("Nutrition", () => {  
  describe("Test createNutrition", () => {
    test("Can create new nutrition successfully with valid params", async () => {
      const user = await User.login({ email: "lebron@james.io", password: "password1" })

      const newNutrition = {
        name: "Pear",
        category: "Fruit",
        quantity: 2,
        calories: 30,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
      }

      const nutrition = await Nutrition.createNutrition({ newNutrition, user })

      
      expect(nutrition).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "lebron",
        name: newNutrition.name,
        category:newNutrition.category,
        quantity: newNutrition.quantity,
        calories: newNutrition.calories,
        imageUrl: newNutrition.imageUrl,
        createdAt: expect.any(Date)
      })
    })

    test("Can create new nutrition successfully when optional attributes aren't provided", async () => {
      const user = await User.login({ email: "lebron@james.io", password: "password1" })

      let newNutrition = {
        name: "Pear",
        category: "Fruit",
        // quantity: 2,
        calories: 30,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
      }

      let nutrition = await Nutrition.createNutrition({ newNutrition, user })

    
      expect(nutrition).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "lebron",
        name: newNutrition.name,
        category:newNutrition.category,
        quantity: 1,
        calories: newNutrition.calories,
        imageUrl: newNutrition.imageUrl,
        createdAt: expect.any(Date)
      })
      newNutrition = {
        name: "Pear",
        category: "Fruit",
        quantity: 2,
        // calories: 30,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
      }

      nutrition = await Nutrition.createNutrition({ newNutrition, user })

    
      expect(nutrition).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "lebron",
        name: newNutrition.name,
        category:newNutrition.category,
        quantity: newNutrition.quantity,
        calories: 1,
        imageUrl: newNutrition.imageUrl,
        createdAt: expect.any(Date)
      })
    })

    test("Throws an error when required attributes aren't provided", async () => {
      expect.assertions(3)
      const user = await User.login({ email: "lebron@james.io", password: "password1" })

      let newNutrition = {
        // name: "Pear",
        category: "Fruit",
        quantity: 2,
        calories: 30,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
      }

      try {
          await Nutrition.createNutrition({ newNutrition, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }

      newNutrition = {
          name: "Pear",
          // category: "Fruit",
          quantity: 2,
          calories: 30,
          imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
      }

      try {
          await Nutrition.createNutrition({ newNutrition, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }

      newNutrition = {
        name: "Pear",
        category: "Fruit",
        quantity: 2,
        calories: 30,
        // imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Pears.jpg"
      }

      try {
          await Nutrition.createNutrition({ newNutrition, user })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()
      }
    })
  })  

  describe("Test updateNutrition", () => {
    test("Can update existing nutrition successfully with valid params", async () => {
      const nutritionId = testNutritionIds[0]
      const updatedNutrition = {
        name: "Lettuce",
        category: "Vegetable",
        quantity: 10,
        calories: 5,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
      }

      const nutrition = await Nutrition.updateNutrition({ nutritionId, updatedNutrition })

      
      expect(nutrition).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: updatedNutrition.name,
        category:updatedNutrition.category,
        quantity: updatedNutrition.quantity,
        calories: updatedNutrition.calories,
        imageUrl: updatedNutrition.imageUrl,
        createdAt: expect.any(Date)
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

      let nutrition = await Nutrition.updateNutrition({ nutritionId, updatedNutrition })
    
      expect(nutrition).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: updatedNutrition.name,
        category: updatedNutrition.category,
        quantity: 1,
        calories: updatedNutrition.calories,
        imageUrl: updatedNutrition.imageUrl,
        createdAt: expect.any(Date)
      })
      updatedNutrition = {
        name: "Lettuce",
        category: "Vegetable",
        quantity: 10,
        // calories: 5,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
      }

      nutrition = await Nutrition.updateNutrition({ nutritionId, updatedNutrition })

    
      expect(nutrition).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: updatedNutrition.name,
        category:updatedNutrition.category,
        quantity: updatedNutrition.quantity,
        calories: 1,
        imageUrl: updatedNutrition.imageUrl,
        createdAt: expect.any(Date)
      })    
    })

    test("Throws an error when required attributes aren't provided", async () => {
      expect.assertions(6)
      const nutritionId = testNutritionIds[0]
      let updatedNutrition = {
        // name: "Lettuce",
        category: "Vegetable",
        quantity: 10,
        calories: 5,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
      }

      try {
        await Nutrition.updateNutrition({ nutritionId, updatedNutrition })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()      
      }

      
      updatedNutrition = {
        name: "Lettuce",
        // category: "Vegetable",
        quantity: 10,
        calories: 5,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
      }

      try {
        await Nutrition.updateNutrition({ nutritionId, updatedNutrition })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()      
      }
      
      updatedNutrition = {
        name: "Lettuce",
        category: "Vegetable",
        quantity: 10,
        calories: 5,
        // imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
      }

      try {
        await Nutrition.updateNutrition({ nutritionId, updatedNutrition })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()      
      }
      
      updatedNutrition = {
        name: "",
        category: "Vegetable",
        quantity: 10,
        calories: 5,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
      }
      
      try {
        await Nutrition.updateNutrition({ nutritionId, updatedNutrition })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()      
      }

      updatedNutrition = {
        name: "Lettuce",
        category: "",
        quantity: 10,
        calories: 5,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
      }
      
      try {
        await Nutrition.updateNutrition({ nutritionId, updatedNutrition })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()      
      }

      updatedNutrition = {
        name: "Lettuce",
        category: "Vegetable",
        quantity: 10,
        calories: 5,
        imageUrl: ""
      }
      
      try {
        await Nutrition.updateNutrition({ nutritionId, updatedNutrition })
      } catch (err) {
          expect(err instanceof BadRequestError).toBeTruthy()      
      }


    })
    test("Throws NotFoundError when id doesn't exist", async () => {      
      expect.assertions(1)
      const nutritionId = -1000
      let updatedNutrition = {
        name: "Lettuce",
        category: "Vegetable",
        quantity: 10,
        calories: 5,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Lettuce_mix.jpg/1024px-Lettuce_mix.jpg"
      }
      try {
        await Nutrition.updateNutrition({ nutritionId, updatedNutrition })
      } catch (err) {
          expect(err instanceof NotFoundError).toBeTruthy()      
      }
      
    })
  })
  describe("Test deleteNutrition", () => {
    test("Can delete existing nutrition by id", async () => {
      const nutritionId = testNutritionIds[0]

      const nutrition = await Nutrition.deleteNutrition(nutritionId)

      expect(nutrition).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: jloNutrition.name,
        category: jloNutrition.category,
        quantity: jloNutrition.quantity,
        calories: jloNutrition.calories,
        imageUrl: jloNutrition.imageUrl,
        createdAt: expect.any(Date)       
      })
    })

    test("Throws NotFoundError when id doesn't exist", async () => {  
      expect.assertions(1)    
      const nutritionId = -1000
      try {
        await Nutrition.deleteNutrition(nutritionId)
      } catch (err) {
          expect(err instanceof NotFoundError).toBeTruthy()      
      }
      
    })
  })
  
  describe("Test listNutritionsFromUser", () => {
    test("Can successfully fetch all nutritions", async () => {
      const user = await User.login({ email: "jennifer@lopez.io", password: "password" })
      const nutritions = await Nutrition.listNutritionsFromUser(user)
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
            createdAt: expect.any(Date)
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
            createdAt: expect.any(Date)
        }        
      ]        
      )
    })
    test("Returns empty array when user doesn't have any nutritions", async () => {
        const user = await User.login({ email: "lebron@james.io", password: "password1" })
        const nutritions = await Nutrition.listNutritionsFromUser(user)
        expect(nutritions.length).toEqual(0)        
      })
  })
  
  describe("Test fetchNutritionById", () => {
    test("Can fetch nutrition by id", async () => {
      const nutritionId = testNutritionIds[0]

      const nutrition = await Nutrition.fetchNutritionById(nutritionId)

      expect(nutrition).toEqual({
        id: expect.any(Number),
        userId: expect.any(Number),
        username: "jlo",
        name: "Apple",
        category: "Fruit",
        quantity: 5,
        calories: 95,
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/199px-Red_Apple.jpg",
        createdAt: expect.any(Date)         
      })
    })

    test("Throws NotFoundError when id doesn't exist", async () => {
      expect.assertions(1)
      const nutritionId = -1000
      try {
        await Nutrition.fetchNutritionById(nutritionId)
      } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy()
      }
    })
  })
})