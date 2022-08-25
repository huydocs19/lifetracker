const db = require("../db")

const createSleeps = async (userIds) => {
  const userId = userIds[0]  
  
  const firstSleep = {
    startTime: "2022-08-23T00:00:00",
    endTime: "2022-08-23T09:00:00",
  }

  const secondSleep = {
    startTime: "2022-08-22T00:00:00",
    endTime: "2022-08-22T08:00:00",
  }

  await db.query(
    `
    INSERT INTO sleeps (
      start_time,
      end_time,
      user_id
    )
    VALUES ($1, $2, $3)  
    `,
    [      
      firstSleep.startTime,
      firstSleep.endTime,      
      userId,
      // sleeps done separately to ensure that created_at timestamp is different
    ]
  )

  await db.query(
    `
    INSERT INTO sleeps (
      start_time,
      end_time,
      user_id
    )
    VALUES ($1, $2, $3)    
    `,
    [      
      secondSleep.startTime,
      secondSleep.endTime,      
      userId,
      // sleeps done separately to ensure that created_at timestamp is different
    ]
  )

  const results = await db.query(`SELECT id FROM sleeps ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

module.exports = {
    createSleeps,
}