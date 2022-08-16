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

    await Sleep.checkInputs(startTime, endTime, user, null)    
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

  static async updateSleep({sleepId, updatedSleep, user}) {
    const requiredFields = ["startTime", "endTime"]      
    requiredFields.forEach((field) => {
      if (!updatedSleep?.hasOwnProperty(field) || !updatedSleep[field]) {
        throw new BadRequestError(`Missing required field - ${field} - in request body.`)
      }
    })


    const startTime = new Date(updatedSleep.startTime)
    const endTime = new Date(updatedSleep.endTime)

    await Sleep.checkInputs(startTime, endTime, user, sleepId) 

    const results = await db.query(
      `
      UPDATE sleep
      SET start_time = $1,
      end_time = $2  
      WHERE id = $3          
      RETURNING id,
                user_id AS "userId",
                start_time AS "startTime",
                end_time AS "endTime",     
                created_at AS "createdAt";                      
      `,
      [              
        updatedSleep.startTime,
        updatedSleep.endTime, 
        sleepId
      ]
    )               
    return results.rows[0]
  }

  static async deleteSleep(exerciseId) {
    const results = await db.query(
      `
      DELETE FROM sleep
      WHERE id = $1
      RETURNING id,
                user_id AS "userId",
                start_time AS "startTime",
                end_time AS "endTime",     
                created_at AS "createdAt";                      
      `,
      [   
        exerciseId
      ]
    )               
    return results.rows[0]
  }

  static async fetchSleepById(sleepId) {
    const results = await db.query(
      `
      SELECT sleep.id,
            sleep.user_id AS "userId",
            users.username AS "username",
            sleep.start_time AS "startTime",
            sleep.end_time AS "endTime",     
            sleep.created_at AS "createdAt"
      FROM sleep
      JOIN users ON users.id = sleep.user_id
      WHERE sleep.id = $1;
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
      SELECT id,
            user_id AS "userId",
            start_time AS "startTime",
            end_time AS "endTime",     
            created_at AS "createdAt"           
      FROM sleep          
      WHERE user_id = (SELECT id FROM users WHERE username = $1);      
      `,
      [user.username]
    )

    return results.rows
  }

  static async checkInputs(startTime, endTime, user, sleepId) {    
    if (startTime.getTime() >= endTime.getTime()) {
      throw new BadRequestError(`End time must be after start time.`)
    }
    const existingSleepTime = await Sleep.getOverlapSleepTime(startTime, endTime, user)  
    if (sleepId) {
      if (existingSleepTime && existingSleepTime.id != sleepId)  {
        throw new BadRequestError(`Overlapping sleep time.`)
      }
    }  
    
  }
  static async getOverlapSleepTime(startTime, endTime, user) {
    
    const results = await db.query(
      `
      SELECT id,
             user_id AS "userId",
             start_time AS "startTime",
             end_time AS "endTime",     
             created_at AS "createdAt"          
      FROM sleep      
      WHERE user_id = (SELECT id FROM users WHERE username = $1) AND end_time >= $2 AND start_time <= $3;      
      `,
      [user.username, startTime, endTime]
    )    
    return results.rows[0]
  }
}

module.exports = Sleep