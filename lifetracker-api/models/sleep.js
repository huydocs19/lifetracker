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

        const startTime = new Date(newSleep.startTime)
        const endTime = new Date(newSleep.endTime)
        if (startTime.getTime() >= endTime.getTime()) {
          throw new BadRequestError(`End time must be after start time.`)
        }
        const existingSleepTime = await this.getOverlapSleepTime(startTime, endTime, user)
        if (existingSleepTime) {
          throw new BadRequestError(`Overlapping sleep time.`)
        }

    
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
              startTime,
              endTime 
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
      static async listSleepFromUser(user) {
        const results = await db.query(
          `
          SELECT sleep.id,
                sleep.user_id AS "userId",
                sleep.start_time AS "startTime",
                sleep.end_time AS "endTime",     
                sleep.created_at AS "createdAt"           
          FROM sleep
          JOIN users ON users.id = sleep.user_id
          WHERE user_id = (SELECT id FROM users WHERE username = $1);      
          `,
          [user.username]
        )
    
        return results.rows
      }
      static async getOverlapSleepTime(startTime, endTime, user) {
        const results = await db.query(
          `
          SELECT *          
          FROM sleep
          JOIN users ON users.id = sleep.user_id
          WHERE sleep.user_id = (SELECT id FROM users WHERE username = $1) AND sleep.end_time >= $2 AND sleep.start_time <= $3;      
          `,
          [user.username, startTime, endTime]
        )
    
        return results.rows[0]
      }
}

module.exports = Sleep