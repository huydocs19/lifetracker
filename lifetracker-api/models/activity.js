const db = require("../db")

class Activity {
    static async getSummaryStats(user) {        
        const totalExerciseMinutes = await Activity.getTotalExerciseMinutes(user)
        const avgSleepHours = await Activity.getAverageSleepHours(user)        
        const avgDailyCalories = await Activity.getAverageDailyCalories(user)              
        const maxCalories = await Activity.getMaxCalories(user)        
        const avgExerciseIntensity = await Activity.getAverageExerciseIntensity(user)        
        const totalSleepHours = await Activity.getTotalSleepHours(user)        
        return {
            exerciseSummaryStats: {
                totalExerciseMinutes, avgExerciseIntensity
            },
            nutritionSummaryStats: {
                avgDailyCalories, maxCalories
            },
            sleepSummaryStats: {
                avgSleepHours, totalSleepHours
            }
        }
    }
    static async getTotalExerciseMinutes(user) {                        
        const results = await db.query(
            `
              SELECT SUM(duration) AS "totalExerciseMinutes"
              FROM exercises
              WHERE user_id = (SELECT id FROM users WHERE username = $1);                 
            `,
            [
              user.username              
            ]
          )                        
        return results.rows[0]?.totalExerciseMinutes || 0
    }
    static async getAverageSleepHours(user) {        
        const results = await db.query(
            `
              SELECT AVG(DATE_PART('day', end_time::timestamp - start_time::timestamp) * 24 + 
              DATE_PART('hour', end_time::timestamp - start_time::timestamp)) AS "avgSleepHours"
              FROM sleep
              WHERE user_id = (SELECT id FROM users WHERE username = $1);                 
            `,
            [
              user.username              
            ]
          )          
        return results.rows[0]?.avgSleepHours || 0
    }
    static async getAverageDailyCalories(user) {
        const results = await db.query(
            `
              SELECT AVG(total_daily_calories) AS "avgDailyCalories"
              FROM 
                (SELECT SUM(calories*quantity) AS total_daily_calories
                FROM nutritions
                WHERE user_id = (SELECT id FROM users WHERE username = $1)
                GROUP BY DATE(created_at)) AS total_calories;                 
            `,
            [
              user.username              
            ]
          )          
        return results.rows[0]?.avgDailyCalories || 0
    }
    static async getMaxCalories(user) {        
        const results = await db.query(
            `
            SELECT MAX(total_daily_calories) AS "maxCalories"
            FROM 
              (SELECT SUM(calories*quantity) AS total_daily_calories
              FROM nutritions
              WHERE user_id = (SELECT id FROM users WHERE username = $1)
              GROUP BY DATE(created_at)) AS total_calories;              
            `,
            [
              user.username              
            ]
          )          
        return results.rows[0]?.maxCalories || 0
    }
    static async getAverageExerciseIntensity(user) {        
        const results = await db.query(
            `
                SELECT AVG(intensity) AS "avgExerciseIntensity"
                FROM exercises
                WHERE user_id = (SELECT id FROM users WHERE username = $1);                 
            `,
            [
              user.username              
            ]
          )          
        return results.rows[0]?.avgExerciseIntensity || 0
    }
    static async getTotalSleepHours(user) {        
        const results = await db.query(
            `
                SELECT SUM(DATE_PART('day', end_time::timestamp - start_time::timestamp) * 24 + 
                DATE_PART('hour', end_time::timestamp - start_time::timestamp)) AS "totalSleepHours"
                FROM sleep
                WHERE user_id = (SELECT id FROM users WHERE username = $1);                 
            `,
            [
              user.username              
            ]
          )          
        return results.rows[0]?.totalSleepHours || 0
    }
      
}

module.exports = Activity