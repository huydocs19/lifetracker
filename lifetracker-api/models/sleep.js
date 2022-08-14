const db = require("../db")
const { BadRequestError, NotFoundError } = require("../utils/errors")

class Sleep {
    static async createSleep({ newSleep, user }) {
        const requiredFields = ["startTime", "endTime"]
        requiredFields.forEach((field) => {
          if (!newSleep?.hasOwnProperty(field) || !newSleep[field]) {
            throw new BadRequestError(`Missing required field - ${field} - in request body.`)
          }
        })
    
        const results = await db.query(
            `
              INSERT INTO sleep (user_id, start_time, end_time)
              VALUES ((SELECT id FROM users WHERE username = $1), $2, $3)
              RETURNING id,
                        user_id AS "userId",
                        start_time AS "startTime",
                        end_time AS "endTime",     
                        created_at AS "createdAt";                       
            `,
            [
              user.username,
              newSleep.startTime,
              newSleep.endTime 
            ]
          )
          return results.rows[0]
      }

      static async fetchSleepById(sleepId) {
        const results = await db.query(
          `
          SELECT id,
                user_id AS "userId",
                start_time AS "startTime",
                end_time AS "endTime",     
                created_at AS "createdAt"
          FROM sleep
          WHERE id = $1;
          `,
          [sleepId]
        )
    
        const sleep = results.rows[0]
    
        if (sleep?.id) return sleep
    
        throw new NotFoundError("No nutrition found with that id.")
      }
      static async fetchAll() {
        const results = await db.query(
          `
          SELECT sleep.id,
                sleep.user_id AS "userId",
                sleep.start_time AS "startTime",
                sleep.end_time AS "endTime",     
                sleep.created_at AS "createdAt"           
          FROM sleep
          JOIN users ON users.id = sleep.user_id;      
          `
        )
    
        return results.rows
      }
}

module.exports = Sleep