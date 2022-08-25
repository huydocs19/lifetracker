const db = require("../db")

const createExercises = async (userIds) => {
  const userId = userIds[0]  

  const firstExercise = {
    name: "Running",
    category: "Strength Training",
    duration: 30,
    intensity: 5
  }

  const secondExercise = {
    name: "Dancing",
    category: "Aerobic Training",
    duration: 20,
    intensity: 6,
  }

  await db.query(
    `
    INSERT INTO exercises (
      name, 
      category, 
      duration,      
      intensity,       
      user_id
    )
    VALUES ($1, $2, $3, $4, $5)    
    `,
    [      
      firstExercise.name,
      firstExercise.category,
      firstExercise.duration,
      firstExercise.intensity,      
      userId,
      // exercises done separately to ensure that created_at timestamp is different
    ]
  )

  await db.query(
    `
    INSERT INTO exercises (
      name, 
      category, 
      duration,      
      intensity,       
      user_id
    )
    VALUES ($1, $2, $3, $4, $5)    
    `,
    [      
      secondExercise.name,
      secondExercise.category,
      secondExercise.duration,
      secondExercise.intensity,      
      userId,
      // exercises done separately to ensure that created_at timestamp is different
    ]
  )

  const results = await db.query(`SELECT id FROM exercises ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

module.exports = {
  createExercises,
}