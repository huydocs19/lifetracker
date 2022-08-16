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
  static async updateNutrition({nutritionId, updatedNutrition}) {
    const requiredFields = ["name", "category", "imageUrl"]      
    requiredFields.forEach((field) => {
      if (!updatedNutrition?.hasOwnProperty(field) || !updatedNutrition[field]) {
        throw new BadRequestError(`Missing required field - ${field} - in request body.`)
      }
    })

    const results = await db.query(
      `
      UPDATE nutritions
      SET name = $1,
      category = $2,
      quantity = $3,
      calories = $4, 
      image_url = $5   
      WHERE id = $6          
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
        updatedNutrition.name,
        updatedNutrition.category,               
        updatedNutrition.quantity || 1,
        updatedNutrition.calories || 1, 
        updatedNutrition.imageUrl, 
        nutritionId
      ]
    )               
    return results.rows[0]
  }

  static async deleteExercise(nutritionId) {
    const results = await db.query(
      `
      DELETE FROM nutritions
      WHERE id = $1
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
        nutritionId
      ]
    )               
    return results.rows[0]
  }

  static async fetchNutritionById(nutritionId) {    
    const results = await db.query(
      `
      SELECT nutritions.id,
            nutritions.user_id AS "userId",
            users.username AS "username",
            nutritions.name,
            nutritions.category, 
            nutritions.quantity, 
            nutritions.calories, 
            nutritions.image_url AS "imageUrl",       
            nutritions.created_at AS "createdAt"
      FROM nutritions
      JOIN users ON users.id = nutritions.user_id
      WHERE nutritions.id = $1;
      `,
      [nutritionId]
    )

    const nutrition = results.rows[0]    
    if (nutrition?.id) return nutrition

    throw new NotFoundError("No nutrition found with that id.")
  }
  static async listNutritionsFromUser(user) {
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
      WHERE user_id = (SELECT id FROM users WHERE username = $1);      
      `,
      [user.username]
    )

    return results.rows
  }
}

module.exports = Nutrition