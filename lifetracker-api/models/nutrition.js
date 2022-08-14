const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Nutrition {
    static async createNutrition({ newNutrition, user }) {
        const requiredFields = ["name", "category", "imageUrl"]
        requiredFields.forEach((field) => {
          if (!newNutrition?.hasOwnProperty(field) || !newNutrition[field]) {
            throw new BadRequestError(`Missing required field - ${field} - in request body.`)
          }
        })
    
        const results = await db.query(
            `
              INSERT INTO nutritions (user_id, name, category, quantity, calories, image_url)
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
          FROM nutritions
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
          SELECT nutritions.id,
                nutritions.user_id AS "userId",
                nutritions.name,
                nutritions.category, 
                nutritions.quantity, 
                nutritions.calories, 
                nutritions.image_url AS "imageUrl",       
                nutritions.created_at AS "createdAt"            
          FROM nutritions
          JOIN users ON users.id = nutritions.user_id;      
          `
        )
    
        return results.rows
      }
}

module.exports = Nutrition