const db = require("../db")

const createNutritions = async (userIds) => {
  const userId = userIds[0]  

  const firstNutrition = {
    name: "Apple",
    category: "Fruit",
    quantity: 5,
    calories: 95,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/199px-Red_Apple.jpg"
  }

  const secondNutrition = {
    name: "Orange",
    category: "Fruit",
    quantity: 2,
    calories: 45,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Oranges_-_whole-halved-segment.jpg/1200px-Oranges_-_whole-halved-segment.jpg"
  }

  await db.query(
    `
    INSERT INTO nutritions (
      name, 
      category, 
      quantity,      
      calories, 
      image_url,      
      user_id
    )
    VALUES ($1, $2, $3, $4, $5, $6)    
    `,
    [      
      firstNutrition.name,
      firstNutrition.category,
      firstNutrition.quantity,
      firstNutrition.calories,
      firstNutrition.imageUrl,      
      userId,
      // nutritions done separately to ensure that created_at timestamp is different
    ]
  )

  await db.query(
    `
    INSERT INTO nutritions (
      name, 
      category, 
      quantity,      
      calories, 
      image_url,      
      user_id
    )
    VALUES ($1, $2, $3, $4, $5, $6)    
    `,
    [      
      secondNutrition.name,
      secondNutrition.category,
      secondNutrition.quantity,
      secondNutrition.calories, 
      secondNutrition.imageUrl,     
      userId,
      // nutritions done separately to ensure that created_at timestamp is different
    ]
  )

  const results = await db.query(`SELECT id FROM nutritions ORDER BY id ASC`)

  const ids = results.rows.map((row) => row.id)
  return ids
}

module.exports = {
  createNutritions,
}