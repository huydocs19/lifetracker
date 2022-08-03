const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Nutrition {
    static async createNutrition({ newNutrition, user }) {
        const requiredFields = ["name", "category", "imageUrl"]
        requiredFields.forEach((field) => {
          if (!newNutrition?.hasOwnProperty(field)) {
            throw new BadRequestError(`Missing required field - ${field} - in request body.`)
          }
        })
    
        const results = await db.query(
            `
              INSERT INTO exercises (user_id, name, category, quantity, calories, image_url)
              VALUES ((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5, $6)
              RETURNING id,
                        user_id AS "userId",
                        name,
                        category, 
                        quantity, 
                        calories, 
                        image_url AS "imageUrl",       
                        created_at AS "createdAt";                       
            `,
            [
              user.username,
              newNutrition.name,
              newNutrition.category,               
              newNutrition.quantity || 1,
              newNutrition.calories || 1, 
              newNutrition.imageUrl, 
            ]
          )
          return results.rows[0]
      }

      static async fetchNutritionById(nutritionId) {
        const results = await db.query(
          `
          SELECT id,
                user_id AS "userId",
                name,
                category, 
                quantity, 
                calories, 
                image_url AS "imageUrl",       
                created_at AS "createdAt"
          FROM nutrition
          WHERE id = $1;
          `,
          [nutritionId]
        )
    
        const nutrition = results.rows[0]
    
        if (nutrition?.id) return nutrition
    
        throw new NotFoundError("No nutrition found with that id.")
      }
      static async fetchAll() {
        const results = await db.query(
          `
          SELECT nutrition.id,
                nutrition.user_id AS "userId",
                nutrition.name,
                nutrition.category, 
                nutrition.quantity, 
                nutrition.calories, 
                nutrition.image_url AS "imageUrl",       
                nutrition.created_at AS "createdAt"            
          FROM nutrition
          JOIN users ON users.id = nutrition.user_id;      
          `
        )
    
        return results.rows
      }
}

module.exports = Nutrition