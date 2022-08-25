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
          INSERT INTO sleeps (user_id, start_time, end_time)
          VALUES ((SELECT id FROM users WHERE username = $1), $2, $3)
          RETURNING id,
                    user_id AS "userId",
                    $1 AS username,
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
      UPDATE sleeps
      SET start_time = $1,
      end_time = $2  
      WHERE id = $3          
      RETURNING id,
                user_id AS "userId",
                (SELECT username FROM users WHERE id = user_id) AS username,
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
    const sleep = results.rows[0]

    if (sleep?.id) return sleep

    throw new NotFoundError("No sleep found with that id.")
  }

  static async deleteSleep(exerciseId) {
    const results = await db.query(
      `
      DELETE FROM sleeps
      WHERE id = $1
      RETURNING id,
                user_id AS "userId",
                (SELECT username FROM users WHERE id = user_id) AS username,
                start_time AS "startTime",
                end_time AS "endTime",     
                created_at AS "createdAt";                      
      `,
      [   
        exerciseId
      ]
    )               
    const sleep = results.rows[0]

    if (sleep?.id) return sleep

    throw new NotFoundError("No sleep found with that id.")
  }

  static async fetchSleepById(sleepId) {
    const results = await db.query(
      `
      SELECT sleeps.id,
            sleeps.user_id AS "userId",
            users.username AS "username",
            sleeps.start_time AS "startTime",
            sleeps.end_time AS "endTime",     
            sleeps.created_at AS "createdAt"
      FROM sleeps
      JOIN users ON users.id = sleeps.user_id
      WHERE sleeps.id = $1;
      `,
      [sleepId]
    )

    const sleep = results.rows[0]

    if (sleep?.id) return sleep

    throw new NotFoundError("No sleep found with that id.")
  }
  static async listSleepsFromUser(user) {
    const results = await db.query(
      `
      SELECT id,
            user_id AS "userId",
            $1 AS username,
            start_time AS "startTime",
            end_time AS "endTime",     
            created_at AS "createdAt"           
      FROM sleeps          
      WHERE user_id = (SELECT id FROM users WHERE username = $1);      
      `,
      [user.username]
    )

    return results.rows
  }

  static async checkInputs(startTime, endTime, user, sleepId) {      
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      throw new BadRequestError(`Start time/End time is not valid.`)
    } 
    if (startTime.getTime() >= endTime.getTime()) {
      throw new BadRequestError(`End time must be after start time.`)
    }
    const existingSleepTime = await Sleep.getOverlapSleepTime(startTime, endTime, user)  
    
    if (sleepId) {
      if (existingSleepTime && existingSleepTime.id != sleepId)  {
        throw new BadRequestError(`Overlapping sleep time.`)
      }
    } else {
      if (existingSleepTime)  {
        throw new BadRequestError(`Overlapping sleep time.`)
      }
    }  
    
  }
  static async getOverlapSleepTime(startTime, endTime, user) {
    
    const results = await db.query(
      `
      SELECT id,
             user_id AS "userId",
             $1 AS username,
             start_time AS "startTime",             
             end_time AS "endTime",     
             created_at AS "createdAt"          
      FROM sleeps      
      WHERE user_id = (SELECT id FROM users WHERE username = $1) AND end_time >= $2 AND start_time <= $3;      
      `,
      [user.username, startTime, endTime]
    )      
    return results.rows[0]
  }
}

module.exports = Sleep