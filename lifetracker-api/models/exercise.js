const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Exercise {
    static async createExercise({ newExercise, user }) {
        const requiredFields = ["name", "category"]        
        requiredFields.forEach((field) => {
          if (!newExercise?.hasOwnProperty(field) || !newExercise[field]) {
            throw new BadRequestError(`Missing required field - ${field} - in request body.`)
          }
        })
    
        const results = await db.query(
            `
              INSERT INTO exercises (user_id, name, duration, intensity, category)
              VALUES ((SELECT id FROM users WHERE username = $1), $2, $3, $4, $5)
              RETURNING id,
                        user_id AS "userId",
                        name,
                        duration,
                        intensity,
                        category,                     
                        created_at AS "createdAt";                       
            `,
            [
              user.username,
              newExercise.name,              
              newExercise.duration || 1,
              newExercise.intensity || 1,
              newExercise.category
            ]
          )          
          return results.rows[0]
      }

      static async fetchExerciseById(exerciseId) {
        const results = await db.query(
          `
          SELECT id,
                user_id AS "userId",
                name,
                duration,
                intensity,
                category,                     
                created_at AS "createdAt"
          FROM exercises
          WHERE id = $1;
          `,
          [exerciseId]
        )
    
        const exercise = results.rows[0]
    
        if (exercise?.id) return exercise
    
        throw new NotFoundError("No exercise found with that id.")
      }
      static async listExercisesFromUser(user) {
        const results = await db.query(
          `
          SELECT id,
                user_id AS "userId",
                name,
                duration,
                intensity,
                category,                     
                created_at AS "createdAt"            
          FROM exercises          
          WHERE user_id = (SELECT id FROM users WHERE username = $1);      
          `,
          [user.username]
        )
    
        return results.rows
      }
}

module.exports = Exercise