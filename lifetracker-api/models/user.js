const {UnauthorizedError, BadRequestError} = require("../utils/errors")
const db = require("../db")
const {BCRYPT_WORK_FACTOR} = require("../config")
const bcrypt = require("bcrypt")

class User {
    static async makePublicUser(user) {
        return {
            id: user.id,
            email: user.email, 
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,            
            createdAt: user.created_at,
            updatedAt: user.updated_at,
            isAdmin: user.is_admin
        }
    }
    static async login(credentials) {
        // user should submit their email and password
        // if any of these fields are missing, throw an error
        const requiredFields = ["email", "password"]
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })
        // take the user's email and lowercase it
        const lowercaseEmail = credentials.email?.toLowerCase()
        // lookup the user in the db by email
        const user = await User.fetchUser("email", lowercaseEmail)        
        // if a user is found, compare the submitted password
        // with the password in the db
        // if there is a match, return the user
        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (isValid) {
                return User.makePublicUser(user)
            }
        }
        // if any of this goes wrong, throw and error
        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials) {        
        // user should submit their info (e.g. email, username, and password) 
        // if any of these fields are missing, throw an error        
        const requiredFields = ["email", "username", "firstName", "lastName",
            "password"]
        requiredFields.forEach((field) => {
            if (!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })
        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }        
        
        // make sure no user already exists in the system with that email
        // if one does, throw an error
        const existingEmail = await User.fetchUserByEmail(credentials.email)        
        if(existingEmail) {
            throw new BadRequestError(`A user already exists with email: ${credentials.email}`)
        }
        const existingUsername = await User.fetchUserByUsername(credentials.username)
        if(existingUsername) {
            throw new BadRequestError(`A user already exists with username: ${credentials.username}`)
        }
        // take the user's email and lowercase it
        const lowercaseEmail = credentials.email.toLowerCase()
        // take the user's username and lowercase it
        const lowercaseUsername = credentials.username.toLowerCase()
        // take the user's password and hash it
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)        
        // create a new user in the db with all their info
        const result = await db.query(
            `
            INSERT INTO users (
                email,
                username,                                
                first_name,
                last_name,
                password
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, email, username, first_name, last_name, created_at, updated_at, is_admin
            `,
            [lowercaseEmail, lowercaseUsername, credentials.firstName, credentials.lastName, hashedPassword]
        )                
        // return the user 
        const user = result.rows[0]
        return User.makePublicUser(user)   
    }
    static async fetchUserByEmail(email) {
        if (!email) {
            throw new BadRequestError("No email provided")            
        }
        const query = `SELECT * FROM users WHERE email = $1`
        const result = await db.query(query, [email.toLowerCase()])        
        const user = result.rows[0]        
        return user
    }  
    static async fetchUserByUsername(username) {
        if (!username) {
            throw new BadRequestError("No username provided")            
        }
        const query = `SELECT * FROM users WHERE username = $1`
        const result = await db.query(query, [username.toLowerCase()])        
        const user = result.rows[0]        
        return user
    }    
}

module.exports = User